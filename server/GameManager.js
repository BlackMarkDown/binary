class GameManager {
  constructor() {
    this.games = [];
  }

  newGame(game) {
    this.games.push(game);
  }

  endGame(game) {
    const index = this.games.indexOf(game);
    if (index > -1) {
      this.games.splice(index, 1);
    }
  }
}

const gameManager = new GameManager();
exports = module.exports = gameManager;
