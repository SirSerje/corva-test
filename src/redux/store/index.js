import socketIO from 'socket.io-client'
import socketIoMiddleware from 'redux-socket.io-middleware'
import reducer from '../reducer'
import { applyMiddleware, createStore } from 'redux'
import { logger } from 'redux-logger'

const some = () => {
  const io = socketIO.connect(`http://localhost:3000`)
  
  io.on('data', function (socket) {
    console.log('data has come', socket)
  })
  return io
}

const store = createStore(
  reducer,
  applyMiddleware(
    socketIoMiddleware(some(), logger),
  ),
)

export default store