import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
  background: #fff;
  margin: 5px 0px;
  padding: 20px;
  border-radius: 4px;
  /* height: 140px; */
  justify-content: space-between;
`

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`

export const AnswearText = styled.Text`
  margin-left: 5px;
  font-size: 16px;
  font-weight: bold;
`

export const ViewRow = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Message = styled.Text`
  color: #999;
  font-size: 14px;
`
