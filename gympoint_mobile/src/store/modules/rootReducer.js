import { combineReducers } from 'redux'

import auth from './auth/reducer'
import help from './help/reducer'

export default combineReducers({ auth, help })
