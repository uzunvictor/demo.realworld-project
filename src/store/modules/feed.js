import {getFeedApi} from '@/api/feed';

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getFeedStart: '[feed] getFeedStart',
  getFeedSuccess: '[feed] getFeedSuccess',
  getFeedFailure: '[feed] getFeedFailure',
};

export const getterTypes = {
  getFeed: '[feed] getFeed',
  isLoading: '[feed] isLoading',
  error: '[feed] error',
  isZeroArticles: '[feed] is zero articles',
};

export const actionTypes = {
  getFeed: '[feed] getFeed',
};

const mutations = {
  [mutationTypes.getFeedStart](state) {
    (state.isLoading = true), (state.data = null);
  },
  [mutationTypes.getFeedSuccess](state, payload) {
    (state.isLoading = false), (state.data = payload);
  },
  [mutationTypes.getFeedFailure](state) {
    state.isLoading = false;
  },
};

const getters = {
  [getterTypes.getFeed](state) {
    return state.data;
  },
  [getterTypes.isLoading](state) {
    return state.isLoading;
  },
  [getterTypes.error](state) {
    return state.error;
  },
  [getterTypes.isZeroArticles]: (state) => {
    const zeroArticles = JSON.parse(JSON.stringify(state.data));
    return zeroArticles.articlesCount === 0;
  },
};

const actions = {
  [actionTypes.getFeed]({commit}, {apiUrl}) {
    return new Promise((resolve) => {
      commit(mutationTypes.getFeedStart);
      getFeedApi(apiUrl)
        .then((response) => {
          commit(mutationTypes.getFeedSuccess, response.data);
          resolve(response.data);
        })
        .catch(() => {
          commit(mutationTypes.getFeedFailure);
        });
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
