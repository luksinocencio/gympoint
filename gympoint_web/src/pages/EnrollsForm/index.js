import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { parseISO, addMonths } from 'date-fns'
import PropTypes from 'prop-types'
import * as Yup from 'yup'

import DatePickerComponent from '~/components/DatePickerComponent'
import MaskedInput from '~/components/MaskedInput'
import api from '~/services/api'
import history from '~/services/history'
import { validation } from '~/util/messages'

import {
  Container,
  Header,
  ButtonBase,
  Data,
  SecondRowForm,
  StudentPicker,
  PlanPicker,
} from './styles'

const schema = Yup.object().shape({
  student: Yup.mixed().required(validation.required),
  plan: Yup.mixed().required(validation.required),
  start_date: Yup.date()
    .typeError(validation.typeError)
    .required(validation.required),
})

export default function EnrollsForm() {
  const [enrolls, setEnrolls] = useState({})
  const [plans, setPlans] = useState([])

  const { id } = useParams()

  function getStudents() {
    return api.get('/students')
  }

  function getPlans() {
    return api.get('/planManagement')
  }

  function getEnrolls() {
    return api.get('/enrolls', {
      params: { id },
    })
  }

  function isNewEnrollment() {
    return !id
  }

  useEffect(() => {
    async function pageLoad() {
      if (!isNewEnrollment()) {
        const getPlansPromise = getPlans()
        const getEnrollsPromise = getEnrolls()

        const plansData = (await getPlansPromise).data
        const registrationData = (await getEnrollsPromise).data

        setPlans(plansData)

        setEnrolls({
          ...registrationData,
          start_date: parseISO(registrationData.start_date),
          end_date: parseISO(registrationData.end_date),
        })
      } else {
        const { data } = await getPlans()
        setPlans(data)
      }
    }

    pageLoad()
  }, []) //eslint-disable-line

  function formatDataToObject(data) {
    const apiObj = {
      ...data,
      student_id: data.student.id,
      plan_id: data.plan.id,
      date: data.start_date,
    }

    delete apiObj.student
    delete apiObj.plan
    delete apiObj.start_date
    delete apiObj.price
    delete apiObj.end_date

    return apiObj
  }

  async function createNewEnrollment(data) {
    data = formatDataToObject(data)

    try {
      await api.post('/enrolls', {
        student_id: data.student_id,
        plan_id: data.plan_id,
        start_date: data.date,
      })

      toast.success('Matrícula feita com sucesso!')
    } catch (err) {
      toast.error(err)
    }
  }

  async function updateData(data) {
    data = formatDataToObject(data)

    try {
      await api.put(`/enrolls/${enrolls.id}`, {
        student_id: data.student_id,
        plan_id: data.plan_id,
        start_date: data.date,
      })

      toast.success('Dados alterados com sucesso!')
    } catch (err) {
      toast.error(err)
    }
  }

  async function handleFormSubmit(data) {
    try {
      if (isNewEnrollment()) {
        await createNewEnrollment(data)
      } else {
        await updateData(data)
      }
    } catch (err) {
      toast.error(err.response.data.error)
    }

    history.push('/enrolls')
  }

  const filterColors = (data, inputValue) => {
    return data.filter(i =>
      i.name.toLowerCase().includes(inputValue.toLowerCase()),
    )
  }

  const loadStudentOptions = async inputValue => {
    async function loadStudents() {
      const { data } = await getStudents()
      return data
    }
    const data = await loadStudents()

    return new Promise(resolve => {
      resolve(filterColors(data, inputValue))
    })
  }

  function handleStartDateChange(newDate) {
    setEnrolls({
      ...enrolls,
      start_date: newDate,
      end_date: enrolls.plan ? addMonths(newDate, enrolls.plan.duration) : null,
    })
  }

  function handlePlanChange(newPlan) {
    setEnrolls({
      ...enrolls,
      plan: newPlan,
      end_date: enrolls.start_date
        ? addMonths(enrolls.start_date, newPlan.duration)
        : null,
      price: newPlan.price * newPlan.duration,
    })
  }

  return (
    <Container>
      <Header>
        <strong>
          {isNewEnrollment() ? 'Cadastro de matrícula' : 'Edição de matrícula'}
        </strong>
        <div>
          <ButtonBase
            type="button"
            onClick={() => history.push('/enrolls')}
            bgColor>
            <MdKeyboardArrowLeft size={20} color="#fff" />
            <span>VOLTAR</span>
          </ButtonBase>
          <ButtonBase type="submit" form="Form" bgColor={false}>
            <MdCheck size={20} color="#fff" />
            <span>SALVAR</span>
          </ButtonBase>
        </div>
      </Header>

      <Data
        id="Form"
        schema={schema}
        initialData={enrolls}
        onSubmit={handleFormSubmit}>
        <label>ALUNO</label>
        <StudentPicker name="student" loadOptions={loadStudentOptions} />

        <SecondRowForm>
          <div>
            <label>PLANO</label>
            <PlanPicker
              name="plan"
              options={plans}
              onChange={handlePlanChange}
            />
          </div>
          <div>
            <label>DATA DE INÍCIO</label>
            <DatePickerComponent
              className="normal-input"
              name="start_date"
              onChange={handleStartDateChange}
            />
          </div>
          <div>
            <label>DATA DE TÉRMINO</label>
            <DatePickerComponent
              className="normal-input"
              name="end_date"
              disabled
            />
          </div>
          <div>
            <label>PRECO TOTAL</label>
            <MaskedInput
              className="normal-input"
              name="price"
              prefix="R$ "
              disabled
            />
          </div>
        </SecondRowForm>
      </Data>
    </Container>
  )
}

EnrollsForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
}
