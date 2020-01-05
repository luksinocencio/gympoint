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
  name: Yup.string().required(validation.required),
  email: Yup.string()
    .email(validation.email)
    .required(validation.required),
  idade: Yup.number()
    .positive(validation.positive)
    .required(validation.required),
  peso: Yup.number()
    .positive(validation.positive)
    .required(validation.required),
  altura: Yup.number().required(validation.required),
})

export default function StudentForm() {
  const [student, setStudent] = useState([])

  const { id } = useParams()

  useEffect(() => {
    async function loadStudent() {
      try {
        const { data } = await api.get('/students', {
          params: { id },
        })

        setStudent(data)
      } catch (err) {
        toast.error(err.response.data.error)
      }
    }

    if (id) {
      loadStudent()
    }
  }, []) //eslint-disable-line

  async function insertStudent(data) {
    await api.post('/students', data)
    toast.success('Cadastro realizado')
  }

  async function updateStudent(data) {
    await api.put(`/students/${student.id}`, data)
    toast.success('Cadastro alterado')
  }

  function handleFormSubmit(data) {
    if (id) {
      updateStudent(data)
    } else {
      insertStudent(data)
    }

    history.push('/students')
  }

  return (
    <Container>
      <Header>
        <strong>{id ? 'Editar aluno' : 'Cadastro de aluno'}</strong>
        <div>
          <ButtonBase
            type="button"
            onClick={() => history.push('/students')}
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
          initialData={student}
          onSubmit={handleFormSubmit}>
          <label>NOME COMPLETO</label>
          <Input name="name" type="text" />
          <label>ENDEREÇO DE E-MAIL</label>
          <Input name="email" type="email" placeholder="teste@mail.com" />
          <div>
            <div>
              <label>IDADE</label>
              <Input name="idade" type="number" />
            </div>
            <div>
              <label>PESO (em kg)</label>
              <MaskedInput name="peso" />
            </div>
            <div>
              <label>ALTURA</label>
              <MaskedInput name="altura" />
            </div>
          </div>
        </Data>
      </Content>
    </Container>
  )
}
