const PacketName = require('../PacketName');

class Player {
  constructor(socket) {
    this.socket = socket;
  }

  on(...args) {
    this.socket.on(args);
  }

  emit(...args) {
    this.socket.emit(args);
  }

  startGame(game, packet) {
    if (this.game) {
      throw new Error('Already player is in game');
    }
    this.game = game;
    this.emit(PacketName.START, packet);
  }

  endGame(packet) {
    this.emit(PacketName.END_GAME, packet);
    this.game = null;
  }

  endTurn(packet) {
    if (!this.game) {
      throw new Error('Player is not in game');
    }
    this.emit(PacketName.END_TURN, packet);
  }
}

module.exports = Player;
