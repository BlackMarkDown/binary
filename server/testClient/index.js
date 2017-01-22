const serverURL = 'http://localhost:3000';
const socket = require('socket.io-client')(serverURL);
const PacketName = require('../../PacketName');

socket.on('connect', () => {
  console.log('connect');
  socket.emit(PacketName.READY);
});
socket.on(PacketName.START, ({ isMyTurn }) => {
  console.log('start');
  if (isMyTurn) {
    setTimeout(() => {
      const oneOrZero = 0;
      console.log(`I say ${oneOrZero}`);
      socket.emit(PacketName.END_TURN, {
        oneOrZero,
      });
    }, 3500);
  }
});

socket.on(PacketName.END_TURN, ({ isMyTurn, oneOrZero }) => {
  console.log('END_TURN');
  if (isMyTurn) {
    console.log(`Opposite said ${oneOrZero}`);
    setTimeout(() => {
      socket.emit(PacketName.END_TURN, {
        oneOrZero: 1,
      });
    }, 500);
  }
});

socket.on(PacketName.END_GAME, ({ isWinner, oneOrZero }) => {
  console.log('END_GAME');
  if (isWinner) {
    console.log(`Opposite said ${oneOrZero}`);
    console.log(`I win!`);
  } else {
    console.log(`I lose...`);
  }
});

socket.on('disconnect', () => {
  console.log('disconnect');
});
