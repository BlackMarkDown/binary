<template>
  <div id="app">
    <main-menu></main-menu>
  </div>
</template>

<script>
import MainMenu from './components/MainMenu';

export default {
  name: 'app',
  components: {
    MainMenu
  }
};
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
