import {updateArticle, getArticle} from '../../api/article';

const state = {
  isSubmitting: false,
  validationErrors: null,
  article: null,
  isLoading: false,
};

export const mutationTypes = {
  getArticleStart: '[editArticle] getArticleStart',
  getArticleSuccess: '[editArticle] getArticleSuccess',
  getArticleFailure: '[editArticle] getArticleFailure',

  updateArticleStart: '[editArticle] updateArticleStart',
  updateArticleSuccess: '[editArticle] updateArticleSuccess',
  updateArticleFailure: '[editArticle] updateArticleFailure',
};

export const actionTypes = {
  getArticle: '[getArticle] getArticle',
  updateArticle: '[updateArticle] updateArticle',
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
    state.validationErrors = payload;
  },

  [mutationTypes.updateArticleStart](state) {
    state.isSubmitting = true;
  },
  [mutationTypes.updateArticleSuccess](state) {
    state.isSubmitting = false;
  },
  [mutationTypes.updateArticleFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
};

const actions = {
  [actionTypes.getArticle]({commit}, {slug}) {
    return new Promise((resolve) => {
      commit(mutationTypes.getArticleStart);
      getArticle(slug)
        .then((result) => {
          commit(mutationTypes.getArticleSuccess, result);
          resolve(result);
        })
        .catch((errors) => {
          commit(mutationTypes.getArticleFailure, errors.response.data.errors);
        });
    });
  },

  [actionTypes.updateArticle]({commit}, {articleInput, slug}) {
    return new Promise((resolve) => {
      commit(mutationTypes.updateArticleStart);
      updateArticle(articleInput, slug)
        .then((result) => {
          commit(mutationTypes.updateArticleSuccess, result);
          resolve(result);
        })
        .catch((errors) => {
          commit(
            mutationTypes.updateArticleFailure,
            errors.response.data.errors
          );
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
