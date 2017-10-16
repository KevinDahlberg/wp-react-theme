import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import postReducer from './posts'
import pageReducer from './pages'

const rootReducer = combineReducers({
  pageReducer,
  postReducer,
  routing: routerReducer
})

export default rootReducer
