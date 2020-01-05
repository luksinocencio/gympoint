import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import { format, parseISO } from 'date-fns'
import pt from 'date-fns/locale/pt'
import Swal from 'sweetalert2'

import api from '~/services/api'

import { Container, WithoutData, Paginator } from './styles'

export default function HelpOrder() {
  const [helps, setHelps] = useState([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(true)

  function formatDate(date) {
    return format(parseISO(date), "d 'de' MMMM 'de' yyyy", {
      locale: pt,
    })
  }

  async function getDataFromServer(page) {
    try {
      const { data } = await api.get('/help-orders', {
        params: { page },
      })

      const newData = data.content.map(help => ({
        ...help,
        dataFormatted: formatDate(help.createdAt),
      }))

      setHelps(newData)
      setPage(page)
      setLastPage(data.lastPage)
    } catch (err) {
      toast.error(err.data.message)
    }
  }

  useEffect(() => {
    getDataFromServer(1)
  }, [])

  async function answearStudent(answear, help) {
    try {
      await api.put(`/help-orders/${help.id}/answear`, {
        answear,
      })

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: toast => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
      })

      Toast.fire({
        icon: 'success',
        title: 'Aluno respondido!',
      })

      getDataFromServer(1)
    } catch (err) {
      console.log(err)
    }
  }

  async function aswearQuestion(help) {
    Swal.fire({
      html: `<div align="justify"><strong>PERGUNTA DO ALUNO</strong> <br/><br/> ${help.question} <br/><br/> <strong>SUA RESPOSTA</strong></div>`,
      input: 'textarea',
      inputAttributes: {
        autocapitalize: 'off',
      },
      inputValue: `${help.answear || ''}`,
      showCancelButton: true,
      confirmButtonText: 'RESPONDER ALUNO',
      confirmButtonColor: '#ee4c64',
      cancelButtonText: 'AGORA NÃO',
      cancelButtonColor: '#666666',
    }).then(result => {
      if (result.value) {
        answearStudent(result.value, help)
      }
    })
  }

  function handlePreviousPageChange() {
    const currentPage = page - 1
    getDataFromServer(currentPage)
  }

  function handleNextPageChange() {
    const currentPage = page + 1
    getDataFromServer(currentPage)
  }

  function renderTableData() {
    return helps.map(help => {
      const { id, student } = help

      return (
        <tr key={id}>
          <td>{student.name}</td>
          <td>
            <span>{help.dataFormatted}</span>
          </td>
          <td>
            <button type="button" onClick={() => aswearQuestion(help)}>
              responder
            </button>
          </td>
        </tr>
      )
    })
  }

  return (
    <Container>
      <h1>Pedido de auxilio</h1>
      <>
        <section>
          {helps.length <= 0 ? (
            <WithoutData>
              <span>Nenhuma pergunta cadastrada.</span>
            </WithoutData>
          ) : (
            <table id="student">
              <thead>
                <tr>
                  <th>Aluno</th>
                  <th>Criado em</th>
                  <th />
                </tr>
              </thead>
              <tbody>{renderTableData()}</tbody>
            </table>
          )}
        </section>
        <Paginator
          lastPage={lastPage}
          page={page}
          handlePreviousPageChange={handlePreviousPageChange}
          handleNextPageChange={handleNextPageChange}
        />
      </>
    </Container>
  )
}
