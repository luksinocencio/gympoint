import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Input } from '@rocketseat/unform'
import * as Yup from 'yup'

import MaskedInput from '~/components/MaskedInput'
import api from '~/services/api'
import history from '~/services/history'
import { validation } from '~/util/messages'

import { Container, Content, Data, Header, ButtonBase } from './styles'

const schema = Yup.object().shape({
  title: Yup.string().required(validation.required),
  duration: Yup.number()
    .positive(validation.positive)
    .typeError(validation.typeError)
    .required(validation.required),
  price: Yup.number()
    .positive(validation.positive)
    .typeError(validation.typeError)
    .required(validation.required),
})

export default function PlansForm() {
  const { id } = useParams()
  const [plans, setPlans] = useState({})

  async function getDataFromServer() {
    try {
      const { data } = await api.get(`/planManagement/${id}`)

      setPlans({
        ...data,
        total: data.duration * data.price,
      })
    } catch (err) {
      toast.error(err)
    }
  }

  useEffect(() => {
    if (id) {
      getDataFromServer()
    }
  }, [])

  function handleDurationChange(newDuration) {
    setPlans({
      ...plans,
      duration: newDuration,
      total: plans.price * newDuration,
    })
  }

  function handlePriceChange(newPrice) {
    setPlans({
      ...plans,
      price: newPrice,
      total: plans.duration * newPrice,
    })
  }

  async function insertPlan(data) {
    await api.post('/planManagement', data)
    toast.success('Plano inserido com sucesso!')
  }

  async function updatePlan(data) {
    await api.put(`/planManagement/${plans.id}`, data)
    toast.success('Plano atualizado com sucesso!')
  }

  async function handleFormSubmit(data) {
    if (id) {
      updatePlan(data)
    } else {
      insertPlan(data)
    }

    history.push('/plans', { params: { page: 1 } })
  }

  return (
    <Container>
      <Header>
        <strong>{id ? 'Editar plano' : 'Cadastro novo plano'}</strong>
        <div>
          <ButtonBase
            type="button"
            onClick={() => history.push('/plans')}
            bgColor>
            <MdKeyboardArrowLeft size={20} color="#fff" />
            <span>VOLTAR</span>
          </ButtonBase>
          <ButtonBase type="submit" form="Form" bgColor={false}>
            <MdCheck size={20} color="#fff" />
            <span>SALVAR</span>
          </ButtonBase>
        </div>
      </Header>

      <Content>
        <Data
          id="Form"
          schema={schema}
          initialData={plans}
          onSubmit={handleFormSubmit}>
          <label>TÍTULO DO PLANO</label>
          <Input name="title" type="text" />

          <div>
            <div>
              <label>DURAÇÃO (em meses)</label>
              <Input
                name="duration"
                type="number"
                onChange={e => handleDurationChange(e.target.value)}
              />
            </div>
            <div>
              <label>PREÇO MENSAL</label>
              <MaskedInput
                name="price"
                prefix="R$ "
                onChange={handlePriceChange}
              />
            </div>
            <div>
              <label>PREÇO TOTAL</label>
              <MaskedInput type="text" name="total" prefix="R$ " disabled />
            </div>
          </div>
        </Data>
      </Content>
    </Container>
  )
}
