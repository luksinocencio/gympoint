import React, { useState, useMemo } from 'react'
import { useDispatch } from 'react-redux'

import Background from '~/components/Background'
import Button from '~/components/Button'
import DismissKeyboard from '~/components/DismissKeyboard'
import { helpCreate } from '~/store/modules/help/actions'

import { InputArea, Label, ViewLabel } from './styles'

export default function NewOrder() {
  const dispatch = useDispatch()

  const [textSize, setTextSize] = useState(0)
  const [helpText, setHelpText] = useState('')

  function changeSuggestionText(text) {
    setTextSize(text.length)
    setHelpText(text)
  }

  const lengthText = useMemo(() => {
    return textSize
  }, [textSize])

  async function sendQuestion() {
    dispatch(helpCreate(helpText))
  }

  return (
    <DismissKeyboard>
      <Background>
        <InputArea
          multiline
          placeholder="Inclua seu pedido"
          value={helpText}
          onChangeText={changeSuggestionText}
          maxLength={255}
          autoCorrect={false}
        />
        <ViewLabel>
          <Label>{`${lengthText} / 255`}</Label>
        </ViewLabel>
        <Button
          onPress={() => sendQuestion()}
          btText="Enviar pedido de auxílio"
        />
      </Background>
    </DismissKeyboard>
  )
}
