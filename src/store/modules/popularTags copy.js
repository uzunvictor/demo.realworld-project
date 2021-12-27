import {popularTagsRequest} from '@/api/popularTags';

export const mutationTypes = {
  getTagsStart: '[tags] getTagsStart',
  getTagsSuccess: '[tags] getTagsSuccess',
  getTagsFailure: '[tags] getTagsFailure',
};

export const actionTypes = {
  getTags: '[tags] getTags Action',
};

const state = {
  isLoading: false,
  tags: null,
  error: null,
};

const mutations = {
  [mutationTypes.getTagsStart](state) {
    state.isLoading = true;
    state.tags = null;
  },
  [mutationTypes.getTagsSuccess](state, payload) {
    state.isLoading = false;
    state.tags = payload;
  },
  [mutationTypes.getTagsFailure](state, payload) {
    state.isLoading = false;
    state.error = payload;
  },
};

const actions = {
  [actionTypes.getTags]({commit}) {
    return new Promise((resolve) => {
      commit(mutationTypes.getTagsStart);
      popularTagsRequest()
        .then((result) => {
          commit(mutationTypes.getTagsSuccess, result);
          resolve(result);
        })
        .catch((e) => commit(mutationTypes.getTagsFailure, e));
    });
  },
};

export default {
  state,
  actions,
  mutations,
};
