import {getArticle, deleteArticle} from '@/api/article';

export const mutationTypes = {
  getArticleStart: '[article] getArticleStart',
  getArticleSuccess: '[article] getArticleSuccess',
  getArticleFailure: '[article] getArticleFailure',

  deleteArticleStart: '[article] deleteArticleStart',
  deleteArticleSuccess: '[article] deleteArticleSuccess',
  deleteArticleFailure: '[article] deleteArticleFailure',
};

export const actionTypes = {
  getArticle: '[article] getArticle Action',
  deleteArticle: '[article] deleteArticle Action',
};

const state = {
  isLoading: false,
  article: null,
  error: null,
};

const mutations = {
  [mutationTypes.getArticleStart](state) {
    state.isLoading = true;
    state.article = null;
  },
  [mutationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false;
    state.article = payload;
  },
  [mutationTypes.getArticleFailure](state, payload) {
    state.isLoading = false;
    state.error = payload;
  },

  [mutationTypes.deleteArticleStart]() {},
  [mutationTypes.deleteArticleSuccess](state) {
    state.article = null;
  },
  [mutationTypes.deleteArticleFailure]() {},
};

const actions = {
  [actionTypes.getArticle]({commit}, {slug}) {
    return new Promise((resolve) => {
      commit(mutationTypes.getArticleStart, slug);
      getArticle(slug)
        .then((article) => {
          commit(mutationTypes.getArticleSuccess, article);
          resolve(article);
        })
        .catch((e) => commit(mutationTypes.getArticleFailure, e));
    });
  },

  [actionTypes.deleteArticle]({commit}, {slug}) {
    return new Promise((resolve) => {
      commit(mutationTypes.deleteArticleStart, slug);
      deleteArticle(slug)
        .then(() => {
          commit(mutationTypes.deleteArticleSuccess);
          resolve('you have deleted article successfully');
        })
        .catch((e) => commit(mutationTypes.deleteArticleFailure, e));
    });
  },
};

export default {
  state,
  actions,
  mutations,
};
