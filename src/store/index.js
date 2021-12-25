import Vue from 'vue';
import Vuex from 'vuex';

import {auth, test, feed, popularTags, article, createArticle} from '@/store/modules';

// import auth from '@/store/modules/auth';
// import test from '@/store/modules/test';
// import feed from '@/store/modules/feed';
// import popularTags from '@/store/modules/popularTags';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    test,
    feed,
    popularTags,
    article,
    createArticle
  },
});
