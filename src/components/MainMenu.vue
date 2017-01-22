<template>
  <div>
    <div id="mainTitle">
      <h1>binary</h1>
    </div>
    <div id="menu">
      <button v-on:click="gameStart">게임 시작</button>
    </div>
  </div>
</template>

<script>
  import Socket from '../Socket';
  import PacketName from '../../PacketName';
  import Router from '../Router';
  import GameStatus from '../GameStatus';

  export default {
    name: 'main-menu',
    data: () => ({
      isWaiting: false,
    }),
    methods: {
      gameStart: function gameStart() {
        if (this.isWaiting) {
          return;
        }
        this.isWaiting = true;
        Socket.emit(PacketName.READY);
      },
    },
    beforeCreate: function beforeCreate() {
      Socket.on(PacketName.START, ({ isMyTurn }) => {
        console.log(isMyTurn);
        GameStatus.isMyTurn = isMyTurn;
        console.log(GameStatus);
        Router.push('/play');
        this.isWaiting = false;
      });
    },
  };
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

#menu {
  text-align: center;
}

</style>
