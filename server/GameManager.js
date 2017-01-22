const Game = require('./Game');

const games = [];

module.exportrs = {
  newGame: (players) => {
    const game = new Game(players);
    games.push(game);
  },
  endGame: (game) => {
    const index = games.indexOf(game);
    if (index > -1) {
      games.splice(index, 1);
    }
  },
};
