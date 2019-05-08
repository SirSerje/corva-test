const back = require('express')();
const http = require('http').Server(back);
const io = require('socket.io')(http);
const randomNumber = require('./randomNumber');

const port = process.env.PORT || 3333;

back.get('/', function (req, res) {
  res.send('Use socket.io-client to connect to the server...');
});

io.on('connection', function (socket) {
  console.log('connect');

  let unsubscribe = randomNumber.subscribe(function (number) {
    console.log(number);

    let data = {
      value: number,
      timestamp: Number(new Date()),
    };
    
    socket.emit('action', { type: 'DATA', payload: data });
  });

  socket.on('disconnect', function () {
    console.log('disconnect')
    unsubscribe();
  });
});

http.listen(port, function () {
  console.log('listening on *:' + port);
});