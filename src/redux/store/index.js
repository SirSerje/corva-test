import { createLogger } from 'redux-logger'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import reducer from '../reducer'

const logger = createLogger({
  collapsed: true,
})

const store = createStore(
  combineReducers({reducer: reducer}),
  applyMiddleware(logger),
)

export default store