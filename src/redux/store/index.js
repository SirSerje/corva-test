import socketIO from 'socket.io-client'
import socketIoMiddleware from 'redux-socket.io-middleware'
import reducer from '../reducer'
import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'

const store = createStore(reducer,
  applyMiddleware(socketIoMiddleware(socketIO.connect(`http://localhost:3333`)),
    createLogger({collapsed: true})))

export default store