import {createArticle} from '../../api/article';

const state = {
  isSubmitting: false,
  validationErrors: null,
};

export const mutationTypes = {
  createArticleStart: '[createArticle] createArticleStart',
  createArticleSuccess: '[createArticle] createArticleSuccess',
  createArticleFailure: '[createArticle] createArticleFailure',
};

export const actionTypes = {
  createArticle: '[createArticle] createArticle',
};

const mutations = {
  [mutationTypes.createArticleStart](state) {
    state.isSubmitting = true;
  },
  [mutationTypes.createArticleSuccess](state) {
    state.isSubmitting = false;
  },
  [mutationTypes.createArticleFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
};

const actions = {
  [actionTypes.createArticle]({commit}, articleInput) {
    return new Promise((resolve) => {
      commit(mutationTypes.createArticleStart);
      createArticle(articleInput)
        .then((result) => {
          commit(mutationTypes.createArticleSuccess, result);
          resolve(result);
        })
        .catch((errors) => {
          commit(
            mutationTypes.createArticleFailure,
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
