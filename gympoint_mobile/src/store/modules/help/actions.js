export function helpRequest(id) {
  return {
    type: '@help/HELP_REQUEST',
    payload: { id },
  }
}

export function helpRefreshRequest(id) {
  return {
    type: '@help/HELP_REFRESH_REQUEST',
    payload: { id },
  }
}

export function helpRefreshSuccess(question, lastPage) {
  return {
    type: '@help/HELP_REFRESH_SUCCESS',
    payload: { question, lastPage },
  }
}

export function helpSuccess(question, lastPage) {
  return {
    type: '@help/HELP_SUCCESS',
    payload: { question, lastPage },
  }
}

export function helpCreate(question) {
  return {
    type: '@help/HELP_CREATE',
    payload: { question },
  }
}

export function helpCreateSuccess(question, lastPage) {
  return {
    type: '@help/HELP_CREATE_SUCCESS',
    payload: { question, lastPage },
  }
}

export function helpFailure() {
  return {
    type: '@help/HELP_FAILURE',
  }
}
