import Vue from 'vue';
import Vuex from 'vuex';
import auth from '@/store/modules/auth';
import test from '@/store/modules/test'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    test
  },
});
