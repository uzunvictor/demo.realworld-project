import authApi from '@/api/auth';
import {setItem} from '@/helpers/persistanceStorage';

const state = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
};

const mutations = {
  registerStart(state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  registerSucces(state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  registerFailure(state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
};

const actions = {
  register({commit}, credentials) {
    return new Promise((resolve) => {
      commit('registerStart');
      authApi
        .register(credentials)
        .then((response) => {
          commit('registerSucces', response.data.user);
          setItem('accessToken', response.data.user.token);
          console.log(response);
          resolve(response.data.user);
        })
        .catch((error) => {
          commit('registerFailure', error.response.data.errors);
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
