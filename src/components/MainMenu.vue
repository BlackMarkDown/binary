<template>
  <div>
    <div id="mainTitle">
      <h1>binary</h1>
    </div>
    <div id="menu">
      <router-link to="/play">게임 시작</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'main-menu',
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
