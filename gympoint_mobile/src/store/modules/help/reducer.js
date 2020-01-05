import produce from 'immer'

const INITIAL_STATE = {
  loading: false,
  question: [],
  page: 1,
  lastPage: false,
  refreshing: false,
}

export default function help(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@help/HELP_REQUEST': {
        draft.loading = true
        break
      }
      case '@help/HELP_SUCCESS': {
        draft.loading = false
        draft.question = [...draft.question, ...action.payload.question]
        draft.page += 1
        draft.lastPage = action.payload.lastPage
        break
      }

      case '@help/HELP_REFRESH_REQUEST': {
        draft.loading = true
        draft.refreshing = true
        break
      }

      case '@help/HELP_REFRESH_SUCCESS': {
        draft.loading = false
        draft.refreshing = false
        draft.question = action.payload.question
        draft.page = 1
        draft.lastPage = action.payload.lastPage
        break
      }

      case '@help/HELP_CREATE': {
        draft.loading = true
        break
      }
      case '@help/HELP_CREATE_SUCCESS': {
        draft.loading = false
        draft.question = [action.payload.question, ...draft.question]
        break
      }
      case '@help/HELP_FAILURE': {
        draft.loading = false
        break
      }
      default:
    }
  })
}
