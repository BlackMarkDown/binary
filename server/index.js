const app = require('express')();
/* eslint new-cap: ["error", { "properties": false }] */
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Player = require('./Player');

io.on('connection', (socket) => {
  console.log('connect');
  const player = new Player(socket);
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
