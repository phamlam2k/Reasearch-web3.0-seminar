import { combineReducers } from 'redux'
import addressReducer from './address'

const rootReducer = combineReducers({
  address: addressReducer,
})

export default rootReducer
