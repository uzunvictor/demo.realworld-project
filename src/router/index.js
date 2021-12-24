import Vue from 'vue';
import VueRouter from 'vue-router';
import GlobalFeed from '@/views/GlobalFeed.vue';
import Register from '@/views/Register.vue';
import Test from '@/views/Test.vue';
import Signin from '@/views/Signin.vue';
import YourFeed from '@/views/YourFeed';
import TagFeed from '@/views/TagFeed';

Vue.use(VueRouter);

const routes = [
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
  {
    path: '/',
    name: 'globalFeed',
    component: GlobalFeed,
  },
  {
    path: '/feed',
    name: 'yourFeed',
    component: YourFeed,
  },
  {
    path: '/tags/:slug',
    name: 'tag',
    component: TagFeed,
  },
  {
    path: '/article/new',
    name: 'createArticle',
    component: GlobalFeed,
  },
  {
    path: '/article/:slug',
    name: 'article',
    component: GlobalFeed,
  },
  {
    path: '/article/:slug/edit',
    name: 'editArticle',
    component: GlobalFeed,
  },
  {
    path: '/settings',
    name: 'settings',
    component: GlobalFeed,
  },
  {
    path: '/profiles/:slug',
    name: 'userProfile',
    component: GlobalFeed,
  },
  {
    path: '/profiles/:slug/favorites',
    name: 'userProfileFavorites',
    component: GlobalFeed,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
