const players = [];

module.exports = {
  addPlayer: player => players.push(player),
  removePlayer: (player) => {
    const index = players.indexOf(player);
    if (index > -1) {
      players.splice(index, 1);
    }
  },
};
