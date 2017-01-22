const app = require('express')();
/* eslint new-cap: ["error", { "properties": false }] */
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Player = require('./Player');
const PlayerManager = require('./PlayerManager');
const ReadyQueue = require('./ReadyQueue');
const PacketName = require('../PacketName');

app.get('/', (req, res) => {
  res.sendfile('index.html');
});

io.on('connection', (socket) => {
  const player = new Player(socket);
  PlayerManager.addPlayer(player);

  player.on(PacketName.READY, () => {
    ReadyQueue.push(player);
  });

  player.on(PacketName.END_TURN, (oneOrZero) => {
    player.game.onEndTurn(player, oneOrZero);
  });

  player.on('disconnect', () => {
    player.game.disconnect(player);
    ReadyQueue.removePlayer(player);
    PlayerManager.removePlayer(player);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
