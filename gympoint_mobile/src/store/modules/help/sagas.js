import { Alert } from 'react-native'

import { parseISO, formatRelative } from 'date-fns'
import pt from 'date-fns/locale/pt'
import { takeLatest, call, put, all, select } from 'redux-saga/effects'

import api from '~/services/api'
import { goBack } from '~/services/navigation'

import {
  helpSuccess,
  helpFailure,
  helpCreateSuccess,
  helpRefreshSuccess,
} from './actions'

function formatDateRelative(date) {
  return formatRelative(parseISO(date), new Date(), {
    locale: pt,
    addSuffix: true,
  })
}

export function* help({ payload }) {
  try {
    const { id } = payload
    const { page } = yield select(state => state.help)

    const { data } = yield call(
      api.get,
      `/students/${id}/help-orders?page=${page}`,
    )

    const pag = data.lastPage

    const arrayQuestions = data.content.map(question => ({
      ...question,
      formattedDate: formatDateRelative(question.createdAt),
    }))

    yield put(helpSuccess(arrayQuestions, pag))
  } catch (err) {
    Alert.alert('Falha na autenticação', err.response.data.error)

    yield put(helpFailure())
  }
}

export function* helpCreate({ payload }) {
  try {
    const { question } = payload
    const auth = yield select(state => state.auth)

    const { data } = yield call(
      api.post,
      `/students/${auth.student.id}/help-orders`,
      {
        question,
      },
    )

    const arrayQuestion = {
      ...data,
      formattedDate: formatDateRelative(data.createdAt),
    }

    yield put(helpCreateSuccess(arrayQuestion))

    goBack()
  } catch (err) {
    Alert.alert('Falha na autenticação', err.response.data.error)

    yield put(helpFailure())
  }
}

export function* helpRefresh({ payload }) {
  try {
    const { id } = payload
    const page = 1

    const { data } = yield call(
      api.get,
      `/students/${id}/help-orders?page=${page}`,
    )

    const pag = data.lastPage

    const arrayQuestions = data.content.map(question => ({
      ...question,
      formattedDate: formatDateRelative(question.createdAt),
    }))

    yield put(helpRefreshSuccess(arrayQuestions, pag))
  } catch (err) {
    Alert.alert('Falha na autenticação', err.response.data.error)

    yield put(helpFailure())
  }
}

export default all([
  takeLatest('@help/HELP_REQUEST', help),
  takeLatest('@help/HELP_CREATE', helpCreate),
  takeLatest('@help/HELP_REFRESH_REQUEST', helpRefresh),
])
