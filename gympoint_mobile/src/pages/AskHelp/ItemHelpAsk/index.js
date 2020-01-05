import React from 'react'
import { Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import PropTypes from 'prop-types'

import { Container, Header, ViewRow, AnswearText, Message } from './styles'

export default function ItemHelpAsk({ help, onPress }) {
  return (
    <Container onPress={onPress}>
      <Header>
        <ViewRow>
          <Icon
            name="checkbox-marked-circle"
            color={help.answear ? '#42CB59' : '#999999'}
            size={16}
          />
          <AnswearText>
            {help.answear ? 'Respondido' : 'Sem resposta'}
          </AnswearText>
        </ViewRow>
        <Text>{help.formattedDate}</Text>
      </Header>
      <Message numberOfLines={3}>{help.question}</Message>
    </Container>
  )
}

ItemHelpAsk.propTypes = {
  help: PropTypes.shape({
    answear: PropTypes.string,
    formattedDate: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
}
