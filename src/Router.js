import VueRouter from 'vue-router';
import MainMenu from './components/MainMenu';
import Play from './components/Play';

const routes = [
  { path: '/', component: MainMenu },
  { path: '/play', component: Play },
];

const Router = new VueRouter({
  mode: 'history',
  routes,
});

export default Router;
