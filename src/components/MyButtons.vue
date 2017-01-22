<template>
  <div class="myButtons">
    <button type="button" class="btn0" v-on:click="buttonPressed(0)">0</button>
    <button type="button" class="btn1" v-on:click="buttonPressed(1)">1</button>
  </div>
</template>

<script>
  import GameStatus from '../GameStatus';
  import Socket from '../Socket';
  import PacketName from '../../PacketName';

  export default {
    name: 'my-buttons',
    methods: {
      buttonPressed: (oneOrZero) => {
        if (GameStatus.isMyTurn) {
          GameStatus.isMyTurn = false;
          GameStatus.lastOneOrZero = oneOrZero;
          Socket.emit(PacketName.END_TURN, {
            oneOrZero,
          });
        }
      },
    },
  };
</script>

<style>
</style>
