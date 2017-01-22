class PlayerManager {
  constructor() {
    this.players = [];
  }

  addPlayer(player) {
    this.players.push(player);
  }

  removePlayer(player) {
    const index = this.players.indexOf(player);
    if (index > -1) {
      this.players.splice(index, 1);
    }
  }
}
const playerManager = new PlayerManager();

exports = module.exports = playerManager;
