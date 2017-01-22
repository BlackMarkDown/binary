const GameManager = require('./GameManager');

const NUMBER_OF_GAME_PLAYER = 2;
const queue = [];

module.exports = {
  push: (player) => {
    queue.push(player);
    if (queue.length >= NUMBER_OF_GAME_PLAYER) {
      const players = [];
      for (let i = 0; i < NUMBER_OF_GAME_PLAYER; i += 1) {
        players.push(queue.shift());
      }
      GameManager.newGame(players);
    }
  },
  removePlayer: (player) => {
    const index = queue.indexOf(player);
    if (index > -1) {
      queue.splice(index, 1);
    }
  },
};
