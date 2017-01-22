const PacketName = require('../PacketName');
const PlayerManager = require('./PlayerManager');
const ReadyQueue = require('./ReadyQueue');

class Player {
  constructor(socket) {
    this.socket = socket;
    PlayerManager.addPlayer(this);

    this.setPacketHandler();
  }

  setPacketHandler() {
    this.on(PacketName.READY, () => {
      ReadyQueue.push(this);
    });

    this.on(PacketName.END_TURN, ({ oneOrZero }) => {
      if (!this.game) {
        throw new Error('End turn called though player is not in game');
      }
      return this.game.onEndTurn(this, oneOrZero);
    });

    this.on('disconnect', () => {
      if (this.game) {
        this.game.onDisconnect(this);
      }
      ReadyQueue.removePlayer(this);
      PlayerManager.removePlayer(this);
    });
  }

  on(...args) {
    this.socket.on(...args);
  }

  emit(...args) {
    this.socket.emit(...args);
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
