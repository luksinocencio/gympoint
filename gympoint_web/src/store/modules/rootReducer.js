import { combineReducers } from 'redux'

import auth from './auth/reducer'
import navitem from './navitem/reducer'

export default combineReducers({
  auth,
  navitem,
})
