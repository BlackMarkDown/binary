// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import MainMenu from './components/MainMenu';
import Play from './components/Play';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: MainMenu },
  { path: '/play', component: Play },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

const app = new Vue({
  router,
});

app.$mount('#app');
