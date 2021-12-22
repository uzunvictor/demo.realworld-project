import {register, login} from '@/api/auth';
import {setItem} from '@/helpers/persistanceStorage';

const state = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
};

export const mutationTypes = {
  registerStart: '[auth] registerStart',
  registerSucces: '[auth] registerSucces',
  registerFailure: '[auth] registerFailure',
};

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
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
};

const actions = {
  [actionTypes.register]({commit}, credentials) {
    return new Promise((resolve) => {
      commit(mutationTypes.registerStart);
      register(credentials)
        .then((response) => {
          commit(mutationTypes.registerSucces, response.data.user);
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
          commit(mutationTypes.registerSucces, response.data.user);
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
};

export default {
  state,
  mutations,
  actions,
};
