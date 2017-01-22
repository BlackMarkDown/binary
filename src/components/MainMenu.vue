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

  const MainMenu = {
    name: 'main-menu',
    data: {
      isWaiting: false,
    },
    methods: {
      gameStart: () => {
        if (MainMenu.data.isWaiting) {
          return;
        }
        MainMenu.data.isWaiting = true;
        Socket.emit(PacketName.READY);
        return;
      },
    },
  };

  Socket.on(PacketName.START, () => {
    Router.push('/play');
    MainMenu.data.isWaiting = false;
  });

  export default MainMenu;
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

#menu {
  text-align: center;
}

</style>
