import { darken } from 'polished'
import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4c64;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Content = styled.div`
  width: 100%;
  max-width: 380px;
  text-align: center;
  background: white;
  padding: 20px;
  border-radius: 4px;
  height: 450px;
  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    label {
      text-align: left;
      margin-bottom: 10px;
      font-weight: bold;
      font-size: 16px;
      text-transform: uppercase;
    }
    input {
      background: white;
      border-radius: 4px;
      border: 1px solid #ddd;
      height: 44px;
      padding: 0 15px;
      color: #666;
      margin: 0 0 10px;
      &::placeholder {
        color: #999;
      }
    }
    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }
    button {
      margin: 5px 0 0;
      height: 44px;
      background: #ee4d64;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 15px;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.03, '#EE4D64')};
      }
    }
    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
  }
`
