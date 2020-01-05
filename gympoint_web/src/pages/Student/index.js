import React, { useEffect, useState } from 'react'
import { MdAdd } from 'react-icons/md'
import { toast } from 'react-toastify'

import Swal from 'sweetalert2'

import api from '~/services/api'
import history from '~/services/history'

import { Container, Header, WithoutData, Paginator } from './styles'

export default function Student() {
  const [students, setStudents] = useState([])
  const [studentName, setStudentName] = useState('')
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(true)

  async function getStudent(page) {
    try {
      const { data } = await api.get('/students', {
        params: {
          q: studentName,
          page,
        },
      })
      setPage(page)
      setStudents(data.content)
      setLastPage(data.lastPage)
    } catch (err) {
      toast.error(err)
    }
  }

  useEffect(() => {
    getStudent(1)
  }, [])

  useEffect(() => {
    // window.location.reload()
  }, [])

  function editUser(id) {
    history.push(`/students/${id}/edit`)
  }

  function registerStudent() {
    history.push('/students/new')
  }

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
        Swal.fire('Deletado!', 'Usuário removido com sucesso!', 'success')
        try {
          await api.delete(`/students/${id}`)
          students.filter(student => student.id !== id)
          getStudent(1)
        } catch (err) {
          const { error } = err.response.data
          toast.error(error)
        }
      }
    })
  }

  function renderTableData() {
    return students.map(student => {
      const { id, name, idade, email } = student
      return (
        <tr key={id}>
          <td>{name}</td>
          <td>{email}</td>
          <td>{idade}</td>
          <td>
            <button type="button" onClick={() => editUser(student.id)}>
              editar
            </button>

            <button type="button" onClick={() => deleteUser(student.id)}>
              apagar
            </button>
          </td>
        </tr>
      )
    })
  }

  function handleStudentNameChange(e) {
    setStudentName(e.target.value)
  }

  function handlePreviousPageChange() {
    const currentPage = page - 1
    getStudent(currentPage)
  }

  function handleNextPageChange() {
    const currentPage = page + 1
    getStudent(currentPage)
  }

  return (
    <Container>
      <Header>
        <h1>Gereciando alunos</h1>
        <div>
          <button type="button" onClick={() => registerStudent()}>
            <MdAdd color="#fff" size={20} />
            <span>CADASTRAR</span>
          </button>
          <input
            name="studentName"
            placeholder="Buscar aluno"
            onKeyDown={event => event.key === 'Enter' && getStudent(1)}
            onChange={handleStudentNameChange}
          />
        </div>
      </Header>

      {students.length > 0 ? (
        <>
          <section>
            <table id="student">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Idade</th>
                  <th />
                </tr>
              </thead>
              <tbody>{renderTableData()}</tbody>
            </table>
          </section>
          <Paginator
            lastPage={lastPage}
            page={page}
            handlePreviousPageChange={handlePreviousPageChange}
            handleNextPageChange={handleNextPageChange}
          />
        </>
      ) : (
        <WithoutData>
          <span>Nenhum aluno encontrado</span>
        </WithoutData>
      )}
    </Container>
  )
}
