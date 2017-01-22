// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import Router from './Router';

Vue.use(VueRouter);

const app = new Vue({
  router: Router,
});

app.$mount('#app');
