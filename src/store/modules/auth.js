import {register, login, getCurrentUser} from '@/api/auth';
import {setItem} from '@/helpers/persistanceStorage';

const state = {
  isLoading: false,
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
};

export const mutationTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure',

  getCurrentUserStart: '[auth] getCurrentUserStart',
  getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
  getCurrentUserFailure: '[auth] getCurrentUserFailure',
};

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
  getCurrentUser: '[auth] getCurrentUser',
};

export const getterTypes = {
  currentUser: '[auth] currentUser',
  isLoggedIn: '[auth] isLoggedIn',
  isAnonymous: '[auth] isAnonymous',
};

const getters = {
  [getterTypes.currentUser]: (state) => {
    return state.currentUser;
  },
  [getterTypes.isLoggedIn]: (state) => {
    return Boolean(state.isLoggedIn);
  },
  [getterTypes.isAnonymous]: (state) => {
    return state.isLoggedIn === false;
  },
};

const mutations = {
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationTypes.registerSucces](state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.registerFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },

  [mutationTypes.getCurrentUserStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.isLoading = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.getCurrentUserFailure](state) {
    state.isLoading = false;
    state.isLoggedIn = false;
    state.currentUser = null;
  },
};

const actions = {
  [actionTypes.register]({commit}, credentials) {
    return new Promise((resolve) => {
      commit(mutationTypes.registerStart);
      register(credentials)
        .then((response) => {
          commit(mutationTypes.registerSuccess, response.data.user);
          setItem('accessToken', response.data.user.token);
          console.log(response);
          resolve(response.data.user);
        })
        .catch((error) => {
          commit(mutationTypes.registerFailure, error.response.data.errors);
          console.log('catch the error', error.response.data.errors);
        });
    });
  },

  [actionTypes.login]({commit}, credentials) {
    return new Promise((resolve) => {
      commit(mutationTypes.registerStart);
      login(credentials)
        .then((response) => {
          commit(mutationTypes.registerSuccess, response.data.user);
          setItem('accessToken', response.data.user.token);
          console.log(response);
          resolve(response.data.user);
        })
        .catch((error) => {
          commit(mutationTypes.registerFailure, error.response.data.errors);
          console.log('catch the error', error.response.data.errors);
        });
    });
  },

  [actionTypes.getCurrentUser]({commit}) {
    return new Promise((resolve) => {
      commit(mutationTypes.getCurrentUserStart);
      getCurrentUser()
        .then((response) => {
          commit(mutationTypes.getCurrentUserSuccess, response.data.user);
          resolve(response.data.user);
        })
        .catch(() => {
          commit(mutationTypes.getCurrentUserFailure);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
