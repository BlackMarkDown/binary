const GameManager = require('./GameManager');
const bigInt = require('big-integer');

class Game {
  constructor(players) {
    this.players = players;
    this.currentBigNumber = bigInt(0);
    this.currentNumberIndex = 0;
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

  getCurrentTurnAnswer() {
    const string = this.currentBigNumber.toString(2);
    const char = string.charAt(this.currentNumberIndex);
    return parseInt(char, 10);
  }

  shiftAnswer() {
    console.log(this.currentBigNumber.toString(2), this.currentBigNumber.toString(2).length, this.currentNumberIndex);
    if (this.currentNumberIndex + 1 >= this.currentBigNumber.toString(2).length) {
      this.currentBigNumber = this.currentBigNumber.add(1);
      this.currentNumberIndex = 0;
      return;
    }
    this.currentNumberIndex += 1;
  }

  onEndTurn(player, oneOrZero) {
    const isInvalidValue = oneOrZero !== 1 && oneOrZero !== 0;
    const isInvalidPlayer = !this.isMyTurn(player) || this.players.indexOf(player) < 0;

    if (isInvalidValue || isInvalidPlayer) {
      // TODO reject
      return this.endGame(player, 0);
    }
    console.log(this.getCurrentTurnAnswer());
    const isWrongValue = this.getCurrentTurnAnswer() !== oneOrZero;

    if (isWrongValue) {
      // TODO what if the players are greater than 2?
      return this.endGame(this.currentTurnPlayer, oneOrZero);
    }

    return this.endTurn(player, oneOrZero);
  }

  isMyTurn(player) {
    return this.currentTurnPlayer === player;
  }

  endGame(loser, oneOrZero) {
    this.players.forEach(player =>
      player.endGame({
        isWinner: loser !== player,
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
    this.shiftAnswer();
  }

  turnPlayer() {
    const currentTurnPlayerIndex = this.players.indexOf(this.currentTurnPlayer);
    const nextTurnPlayerIndex = (currentTurnPlayerIndex + 1) % this.players.length;
    this.currentTurnPlayer = this.players[nextTurnPlayerIndex];
  }

  onDisconnect(player) {
    this.endGame(player);
  }
}

exports = module.exports = Game;
