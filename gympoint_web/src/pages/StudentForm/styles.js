import { Form } from '@rocketseat/unform'
import styled from 'styled-components'

export const Container = styled.div`
  margin-top: 20px;
  padding: 30px 150px;
  max-width: 90%;
  margin: 0 auto;

  h1 {
    color: #444444;
  }
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  strong {
    font-size: 24px;
  }
  div {
    display: flex;

    button {
      width: 112px;
      height: 36px;
      border: 0;
      border-radius: 4px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        margin-left: 5px;
      }
    }
  }
`

export const Content = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  margin-top: 20px;
`

export const Data = styled(Form)`
  margin-top: 20px;
  width: 100%;
  font-size: 16px;
  background: #fff;
  padding: 30px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  label {
    font-size: 14px;
    line-height: 16px;
    font-weight: bold;
    margin-top: 20px;
    &:first-child {
      margin-top: 0px;
    }
  }
  input {
    height: 36px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    margin-top: 8px;
    padding: 20px;
  }
  & > div {
    margin-top: 20px;
    display: flex;
    & > div {
      display: flex;
      flex: 1;
      flex-direction: column;
      margin-right: 15px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
`

export const ButtonBase = styled.button`
  width: 112px;
  height: 36px;
  border: 0;
  border-radius: 4px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => (props.bgColor ? '#CCCCCC' : '#EE4D64')};
  margin: 0 10px;

  span {
    margin-left: 5px;
  }
`
