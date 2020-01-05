import React from 'react'

import PropTypes from 'prop-types'

import Background from '~/components/Background'

import { Container, Header, Title, Label, ViewSpace } from './styles'

export default function Answear({ navigation }) {
  const item = navigation.getParam('item')

  return (
    <Background>
      <Container>
        <Header>
          <Title>PERGUNTA</Title>
          <Label>{item.formattedDate}</Label>
        </Header>
        <Label>{item.question}</Label>
        <ViewSpace />
        {!item.answear ? null : (
          <>
            <Header>
              <Title>RESPOSTA</Title>
            </Header>
            <Label>{item.answear}</Label>
          </>
        )}
      </Container>
    </Background>
  )
}

Answear.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
}
