import { Platform } from 'react-native'

import styled from 'styled-components/native'

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
`

export const Form = styled.View`
  align-self: stretch;
  margin-top: 30px;
`

export const Logo = styled.Image``

export const Input = styled.TextInput`
  height: 50px;
  border-radius: 4px;
  padding: 0px 15px;
  border-width: 1px;
  border-color: #999999;
`

export const Btn = styled.TouchableOpacity`
  height: 50px;
  background: #ee4d64;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin-top: 15px;
`

export const BtnText = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`
