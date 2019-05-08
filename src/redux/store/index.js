import socketIO from 'socket.io-client'
import socketIoMiddleware from 'redux-socket.io-middleware'
import reducer from '../reducer'
import { applyMiddleware, createStore } from 'redux'
import { logger } from 'redux-logger'

const ioConnection = () => {
  const io = socketIO.connect(`http://localhost:3333`)
  io.on('action', (a) => {
    console.warn('data', a);
  })
  return io
}

const io = ioConnection();
const middleware = applyMiddleware(socketIoMiddleware(io, logger));
const store = createStore(reducer, middleware)

export default store