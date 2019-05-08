var back = require('express')();
var http = require('http').Server(back);
var io = require('socket.io')(http);
var randomNumber = require('./randomNumber');

var port = process.env.PORT || 3333;

back.get('/', function (req, res) {
  res.send('Use socket.io-client to connect to the server...');
});

io.on('connection', function (socket) {
  console.log('connect');

  var unsubscribe = randomNumber.subscribe(function (number) {
    console.log(number);

    var data = {
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