import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector } from 'react-redux'

import { parseISO, formatRelative } from 'date-fns'
import pt from 'date-fns/locale/pt'

import Background from '~/components/Background'
import Button from '~/components/Button'
import LoadingView from '~/components/LoadingView'
import api from '~/services/api'
import { store } from '~/store'
import { signOut } from '~/store/modules/auth/actions'

import ItemCheckin from './ItemCheckin'
import { Header, Content, List, SignOutBtn } from './styles'

export default function Checkins() {
  const [checkins, setCheckins] = useState([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(false)
  const [loading, setLoading] = useState(false)
  const user = useSelector(state => state.auth)

  function formatDateRelative(date) {
    return formatRelative(parseISO(date), new Date(), {
      locale: pt,
      addSuffix: true,
    })
  }

  function removeDuplicates(list, attribute) {
    return list.filter(
      (item, pos) =>
        list.map(checkin => checkin[attribute]).indexOf(item[attribute]) ===
        pos,
    )
  }

  async function getData() {
    if (!lastPage) {
      try {
        const { data } = await api.get(
          `students/${user.student.id}/checkins?page=${page}`,
        )

        const newData = data.content.map(checkin => ({
          ...checkin,
          formattedDate: formatDateRelative(checkin.createdAt),
        }))

        if (page === 1) {
          setCheckins(newData)
        } else {
          const newCheckins = [...checkins, ...newData]
          setCheckins(removeDuplicates(newCheckins, 'id'))
        }

        setPage(page + 1)
        setLastPage(data.lastPage)
      } catch (err) {
        Alert.alert('Error', err)
      }
    }
  }

  useEffect(() => {
    getData()
  }, [])

  async function createCheckin() {
    setLoading(true)
    try {
      const { data } = await api.post(`students/${user.student.id}/checkins`)

      const newCheckins = [
        { ...data, formattedDate: formatDateRelative(data.createdAt) },
        ...checkins,
      ]

      setCheckins(newCheckins)
      setLoading(false)
    } catch (err) {
      Alert.alert('Erro', err.response.data.error)
      setLoading(false)
    }
  }

  function renderFooter() {
    if (!loading) {
      return null
    }
    return <LoadingView />
  }

  return (
    <Background>
      <Header>
        <Button onPress={() => createCheckin()} btText="Novo check-in" />
      </Header>
      <Content>
        <List
          data={checkins}
          keyExtractor={item => String(item.id)}
          renderItem={({ item, index }) => (
            <ItemCheckin checkin={item} index={checkins.length - index} />
          )}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
          onEndReached={getData}
          onEndReachedThreshold={0.1}
        />
      </Content>
    </Background>
  )
}

Checkins.navigationOptions = () => ({
  headerRight: (
    <SignOutBtn onPress={() => store.dispatch(signOut())}>
      <Icon name="logout-variant" size={26} color="#ee4d64" />
    </SignOutBtn>
  ),
})
