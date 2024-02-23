import { createRouter, createWebHashHistory } from 'vue-router';

import Indicadores from '../Indicadores.vue'

const routes = [
  { path: '/:ticker', component: Indicadores, props: true},
  { path: '/', component: Indicadores, props: false},
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router
