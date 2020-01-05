import React, { useEffect } from 'react'
import { RefreshControl } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import PropTypes from 'prop-types'

import Background from '~/components/Background'
import Button from '~/components/Button'
import LoadingView from '~/components/LoadingView'
import { helpRequest, helpRefreshRequest } from '~/store/modules/help/actions'

import ItemHelpAsk from './ItemHelpAsk'
import { Header, List } from './styles'

export default function AskHelp({ navigation }) {
  const user = useSelector(state => state.auth)
  const refreshing = useSelector(state => state.help.refreshing)
  const lastPage = useSelector(state => state.help.lastPage)
  const distpath = useDispatch()

  function getDataFromServer() {
    if (!lastPage) {
      distpath(helpRequest(user.student.id))
    }
  }

  function onRefresh() {
    distpath(helpRefreshRequest(user.student.id))
  }

  useEffect(() => {
    getDataFromServer()
  }, [])

  const help = useSelector(state => state.help)

  function renderFooter() {
    if (!help.loading) {
      return null
    }
    return <LoadingView />
  }

  return (
    <Background>
      <Header>
        <Button
          onPress={() => navigation.navigate('NewOrder')}
          btText="Novo pedido de auxílio"
        />
      </Header>
      <List
        data={help.question}
        keyExtractor={item => String(item.id)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <ItemHelpAsk
            help={item}
            onPress={() => navigation.navigate('Answear', { item })}
          />
        )}
        showsVerticalScrollIndicator={false}
        onEndReached={getDataFromServer}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
    </Background>
  )
}

AskHelp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
}
