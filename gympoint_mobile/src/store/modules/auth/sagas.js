import { Alert } from 'react-native'

import { takeLatest, call, put, all } from 'redux-saga/effects'

import api from '~/services/api'

import { signInSuccess, signFailure } from './actions'

export function* signIn({ payload }) {
  try {
    const { id } = payload

    const response = yield call(api.post, '/students-exists', {
      id,
    })

    const student = response.data

    yield put(signInSuccess(student))
  } catch (err) {
    Alert.alert('Falha na autenticação', err.response.data.error)

    yield put(signFailure())
  }
}

export function* signOut() {}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
])
