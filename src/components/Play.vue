<template>
  <div>
    <counter></counter>
    <counter-bar></counter-bar>
    <opponent-buttons></opponent-buttons>
    <my-buttons></my-buttons>
  </div>
</template>

<script>
  import Counter from './Counter';
  import CounterBar from './CounterBar';
  import OpponentButtons from './OpponentButtons';
  import MyButtons from './MyButtons';

  export default {
    name: 'play',
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
