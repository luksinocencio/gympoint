import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import logo from '~/assets/images/logo.png'
import DismissKeyboard from '~/components/DismissKeyboard'
import { signInRequest } from '~/store/modules/auth/actions'

import { Container, Form, Logo, Input, Btn, BtnText } from './styles'

export default function SignIn() {
  const dispatch = useDispatch()
  const [studentId, setStudentId] = useState('')

  function handleSubmit() {
    dispatch(signInRequest(studentId))
  }

  return (
    <DismissKeyboard>
      <Container>
        <Logo source={logo} />
        <Form>
          <Input
            placeholder="Informe seu ID cadastro"
            placeholderTextColor="#999"
            value={studentId}
            onChangeText={setStudentId}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
          />
          <Btn onPress={() => handleSubmit()}>
            <BtnText>Entrar no sistema</BtnText>
          </Btn>
        </Form>
      </Container>
    </DismissKeyboard>
  )
}
