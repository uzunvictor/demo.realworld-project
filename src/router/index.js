import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Register from '@/views/Register.vue';
import Test from '@/views/Test.vue';
import Signin from '@/views/Signin.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/sign_in',
    name: 'sign_in',
    component: Signin,
  },
  {
    path: '/test',
    name: 'test',
    component: Test,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
