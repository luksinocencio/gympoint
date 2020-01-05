import React, { useEffect, useState } from 'react'
import { MdAdd, MdCheckCircle } from 'react-icons/md'
import { toast } from 'react-toastify'

import { format, parseISO } from 'date-fns'
import pt from 'date-fns/locale/pt'
import Swal from 'sweetalert2'

import api from '~/services/api'
import history from '~/services/history'

import { Container, Header, WithoutData, Paginator } from './styles'

export default function Enrolls() {
  const [enrolls, setEnrolls] = useState([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(true)

  function formatDate(date) {
    return format(parseISO(date), "d 'de' MMMM 'de' yyyy", {
      locale: pt,
    })
  }

  async function getDataFromServer(page) {
    try {
      const { data } = await api.get('/enrolls', {
        params: {
          page,
        },
      })

      const newData = data.content.map(enroll => ({
        ...enroll,
        start_dataFormatted: formatDate(enroll.start_date),
        end_dataFormatted: formatDate(enroll.end_date),
      }))

      setEnrolls(newData)
      setPage(page)
      setLastPage(data.lastPage)
    } catch (err) {
      toast.error(`${err}`)
    }
  }

  useEffect(() => {
    getDataFromServer(1)
  }, [])

  async function deleteUser(id) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then(async result => {
      if (result.value) {
        Swal.fire('Deletadooo!', 'Matrícula cancelada', 'success')
        try {
          await api.delete(`/enrolls/${id}`)

          enrolls.filter(enroll => enroll.id !== id)

          getDataFromServer(1)
        } catch (err) {
          const { error } = err.response.data
          toast.error(error)
        }
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
    return enrolls.map(enroll => {
      const {
        id,
        active,
        student,
        plan,
        end_dataFormatted,
        start_dataFormatted,
      } = enroll

      return (
        <tr key={id}>
          <td>{student.name}</td>
          <td>{plan.title}</td>
          <td>{start_dataFormatted}</td>
          <td>{end_dataFormatted}</td>
          <td>
            <MdCheckCircle color={active ? 'green' : 'gray'} size={20} />
          </td>
          <td>
            <button
              type="button"
              onClick={() => history.push(`enrolls/${id}/edit`)}>
              editar
            </button>

            <button type="button" onClick={() => deleteUser(id)}>
              apagar
            </button>
          </td>
        </tr>
      )
    })
  }

  return (
    <Container>
      <Header>
        <h1>Gerenciando matrículas</h1>

        <div>
          <button type="button" onClick={() => history.push('/enrolls/new')}>
            <MdAdd color="#fff" size={20} />
            <span>CADASTRAR</span>
          </button>
        </div>
      </Header>

      <>
        <section>
          {enrolls.length <= 0 ? (
            <WithoutData>
              <span>Nenhum aluno matrículado.</span>
            </WithoutData>
          ) : (
            <table id="student">
              <thead>
                <tr>
                  <th>ALUNO</th>
                  <th>PLANO</th>
                  <th>INÍCIO</th>
                  <th>TÉRMINO</th>
                  <th>ATIVO</th>
                  <th aria-label="Título da coluna vazia" />
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
