<template>
  <div>
    <counter></counter>
    <counter-bar></counter-bar>
    <opponent-buttons></opponent-buttons>
    <div>{{ isMyTurn ? '내턴' : '상대턴'}} </div>
    <div>{{ lastOneOrZero }}</div>
    <my-buttons></my-buttons>
  </div>
</template>

<script>
  import Counter from './Counter';
  import CounterBar from './CounterBar';
  import OpponentButtons from './OpponentButtons';
  import MyButtons from './MyButtons';
  import GameStatus from '../GameStatus';
  import Socket from '../Socket';
  import PacketName from '../../PacketName';

  export default {
    name: 'play',
    data: () => ({
      isMyTurn: GameStatus.isMyTurn,
      lastOneOrZero: GameStatus.lastOneOrZero,
    }),
    methods: {
      onEndTurn: function onEndTurn({ isMyTurn, oneOrZero }) {
        this.isMyTurn = GameStatus.isMyTurn = isMyTurn;
        this.lastOneOrZero = GameStatus.lastOneOrZero = oneOrZero;
      },
    },
    beforeCreate: function beforeCreate() {
      Socket.on(PacketName.END_TURN, (packet) => {
        this.onEndTurn(packet);
      });
      Socket.on(PacketName.END_GAME, ({ isWinner, oneOrZero }) => {
        // TODO handle game ending
      });
    },
    components: {
      Counter,
      CounterBar,
      OpponentButtons,
      MyButtons,
    },
  };
</script>

<style>
</style>
