const GameManager = require('./GameManager');

class Game {
  constructor(players) {
    this.players = players;
    this.setFirstTurnPlayer();
    this.startGame();
  }

  setFirstTurnPlayer() {
    const firstTurnPlayerIndex = Math.floor(Math.random() * this.players.length);
    this.currentTurnPlayer = this.players[firstTurnPlayerIndex];
  }

  startGame() {
    this.players.forEach(player =>
      player.startGame(this, {
        isMyTurn: this.isMyTurn(player),
      }));
  }

  onEndTurn(player, oneOrZero) {
    const isInvalidValue = oneOrZero !== 1 || oneOrZero !== 0;
    const isInvalidPlayer = !this.isMyTurn(player) || this.players.indexOf(player) < 0;

    if (isInvalidValue || isInvalidPlayer) {
      // TODO reject
      return this.endGame(player, 0);
    }

    const isWrongValue = false;

    if (isWrongValue) {
      // TODO what if the players are greater than 2?
      return this.endGame(oneOrZero);
    }

    return this.endTurn(oneOrZero);
  }

  isMyTurn(player) {
    return this.currentTurnPlayer === player;
  }

  endGame(oneOrZero) {
    this.players.forEach(player =>
      player.endGame({
        isWinner: this.currentTurnPlayer !== player,
        oneOrZero,
      }));

    GameManager.endGame(this);
  }

  endTurn(previousPlayer, oneOrZero) {
    this.turnPlayer();
    this.players.forEach(player =>
      player.endTurn({
        isMyTurn: this.currentTurnPlayer === player,
        oneOrZero,
      }));
  }

  turnPlayer() {
    const currentTurnPlayerIndex = this.players.indexOf(this.currentTurnPlayer);
    const nextTurnPlayerIndex = (currentTurnPlayerIndex + 1) % this.players.length;
    this.currentTurnPlayer = this.players[nextTurnPlayerIndex];
  }
}

module.exports = Game;
