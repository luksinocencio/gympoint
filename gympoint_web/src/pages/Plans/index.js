import React, { useEffect, useState } from 'react'
import { MdAdd } from 'react-icons/md'
import { toast } from 'react-toastify'

import Swal from 'sweetalert2'

import api from '~/services/api'
import history from '~/services/history'
import { formatPrice } from '~/util/format'

import { Container, Header, WithoutData, Paginator } from './styles'

export default function Plans() {
  const [plans, setPlans] = useState([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(true)

  async function getDataFromServer(page) {
    try {
      const { data } = await api.get('/planManagement', {
        params: { page },
      })

      const newData = data.content.map(plan => ({
        ...plan,
        durationFormatted: `${plan.duration} ${
          plan.duration > 1 ? 'Meses' : 'Mês'
        }`,
        priceFormatted: formatPrice(plan.price),
      }))

      setPlans(newData)
      setPage(page)
      setLastPage(data.lastPage)
    } catch (err) {
      toast.error(err.data.message)
    }
  }

  useEffect(() => {
    getDataFromServer(1)
  }, [])

  async function deletePlan(id) {
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
        Swal.fire('Deletadooo!', 'Plano removido com sucesso!', 'success')
        try {
          await api.delete(`/planManagement/${id}`)
          plans.filter(plan => plan.id !== id)
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
    return plans.map(plan => {
      const { id, title, durationFormatted, priceFormatted } = plan
      return (
        <tr key={id}>
          <td>{title}</td>
          <td>{durationFormatted}</td>
          <td>{priceFormatted}</td>
          <td>
            <button
              type="button"
              onClick={() => history.push(`/plans/${plan.id}/edit`)}>
              editar
            </button>

            <button type="button" onClick={() => deletePlan(id)}>
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
        <h1>Gerenciando Planos</h1>
        <div>
          <button type="button" onClick={() => history.push(`/plans/new`)}>
            <MdAdd color="#fff" size={20} />
            <span>CADASTRAR</span>
          </button>
        </div>
      </Header>
      <>
        <section>
          {plans.length <= 0 ? (
            <WithoutData>
              <span>Nenhum aluno matrículado.</span>
            </WithoutData>
          ) : (
            <table id="plans">
              <thead>
                <tr>
                  <th>TÍTULO</th>
                  <th>DURAÇÃO</th>
                  <th>VALOR p/ MÊS</th>
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
