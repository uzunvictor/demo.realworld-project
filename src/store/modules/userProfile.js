import userProfileApi from '@/api/userProfile';

export const mutationTypes = {
  getUserProfileStart: '[UserProfile] getUserProfileStart',
  getUserProfileSuccess: '[UserProfile] getUserProfileSuccess',
  getUserProfileFailure: '[UserProfile] getUserProfileFailure',
};

export const actionTypes = {
  getUserProfile: '[UserProfile] getUserProfile Action',
};

const state = {
  isLoading: false,
  profile: null,
  error: null,
};

const mutations = {
  [mutationTypes.getUserProfileStart](state) {
    state.isLoading = true;
    state.profile = null;
  },
  [mutationTypes.getUserProfileSuccess](state, payload) {
    state.isLoading = false;
    state.profile = payload;
  },
  [mutationTypes.getUserProfileFailure](state, payload) {
    state.isLoading = false;
    state.error = payload;
  },
};

const actions = {
  [actionTypes.getUserProfile]({commit}, {slug}) {
    return new Promise((resolve) => {
      commit(mutationTypes.getUserProfileStart);
      userProfileApi
        .getUserProfile(slug)
        .then((profile) => {
          commit(mutationTypes.getUserProfileSuccess, profile);
          resolve(profile);
        })
        .catch((e) => commit(mutationTypes.getUserProfileFailure, e));
    });
  },
};

export default {
  state,
  actions,
  mutations,
};
