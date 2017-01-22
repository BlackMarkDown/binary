const GameManager = require('./GameManager');
const Game = require('./Game');

const NUMBER_OF_GAME_PLAYER = 2;

class ReadyQueue {
  constructor() {
    this.queue = [];
  }

  push(player) {
    this.queue.push(player);
    if (this.queue.length >= NUMBER_OF_GAME_PLAYER) {
      const players = [];
      for (let i = 0; i < NUMBER_OF_GAME_PLAYER; i += 1) {
        players.push(this.queue.shift());
      }
      const game = new Game(players);
      GameManager.newGame(game);
    }
  }
  removePlayer(player) {
    const index = this.queue.indexOf(player);
    if (index > -1) {
      this.queue.splice(index, 1);
    }
  }
}
const readyQueue = new ReadyQueue();
exports = module.exports = readyQueue;
