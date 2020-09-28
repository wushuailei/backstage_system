import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      hidden: 0,
      keepalive: 0,
      layoutShow: false,
      title: '首页',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue'),
    meta: {
      layoutShow: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
