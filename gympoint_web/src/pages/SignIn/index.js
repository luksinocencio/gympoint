import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Form, Input } from '@rocketseat/unform'
import * as Yup from 'yup'

import logo from '~/assets/image/logo.png'
import { signInRequest } from '~/store/modules/auth/actions'

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Informe um e-mail válido')
    .required('O e-email é obrigátorio'),
  password: Yup.string().required('A senha é obrigatória.'),
})

export default function SignIn() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.auth.loading)

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password))
  }

  return (
    <>
      <img src={logo} alt="Logo gobarber" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <label htmlFor="email">Seu E-mail</label>
        <Input name="email" type="email" placeholder="exemplo@email.com" />
        <label htmlFor="password">Sua senha</label>
        <Input name="password" type="password" placeholder="********" />

        <button type="submit">
          {loading ? 'Carregando...' : 'Entrar no sistema'}
        </button>
      </Form>
    </>
  )
}
