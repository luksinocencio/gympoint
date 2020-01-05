import styled from 'styled-components'

import PaginatorComponent from '~/components/PaginatorComponent'

export const Container = styled.div`
  margin-top: 20px;
  padding: 30px 150px;
  max-width: 80%;
  margin: 0 auto;

  h1 {
    color: #444444;
  }

  section {
    background: white;
    margin-top: 30px;
    padding: 20px;
    border-radius: 4px;

    display: flex;

    table {
      border-collapse: collapse;
      width: 100%;

      th {
        text-align: left;
        height: 50px;
        font-size: 16px;
        text-transform: uppercase;
      }

      tr {
        td {
          height: 50px;
          border-bottom: 1px solid #eeeeee;
          color: #666666;
          font-size: 16px;

          &:last-child {
            display: flex;
            justify-content: flex-end;
          }
        }
      }

      tr {
        td {
          height: 50px;
          border-bottom: 1px solid #eeeeee;
          color: #666666;
          font-size: 16px;
        }
      }

      button {
        background: none;
        border: 0;
        &:first-child {
          color: #666;
          margin-right: 23px;
        }
        &:last-child {
          color: #4d85ee;
        }
      }
    }
  }
`

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`
export const WithoutData = styled.div`
  margin-top: 20px;
  width: 100%;
  background: #fff;
  border-radius: 4px;
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 16px;
  }
`
export const Paginator = styled(PaginatorComponent)`
  margin-top: 15px;
`
