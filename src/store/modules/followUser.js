import followUserApi from '@/api/followUser';

export const mutationTypes = {
  followUserStart: '[followUser] followUserStart',
  followUserSuccess: '[followUser] followUserSuccess',
  followUserFailure: '[followUser] followUserFailure',

  unfollowUserStart: '[unfollowUser] unfollowUserStart',
  unfollowUserSuccess: '[unfollowUser] unfollowUserSuccess',
  unfollowUserFailure: '[unfollowUser] unfollowUserFailure',
};

export const actionTypes = {
  followUser: '[followUser] followUser action',
  unfollowUser: '[unfollowUser] unfollowUser action',
};

const mutations = {
  [mutationTypes.followUserStart]() {},
  [mutationTypes.followUserSuccess]() {},
  [mutationTypes.followUserFailure]() {},

  [mutationTypes.unfollowUserStart]() {},
  [mutationTypes.unfollowUserSuccess]() {},
  [mutationTypes.unfollowUserFailure]() {},
};

const actions = {
  [actionTypes.followUser]({commit}, {slug, credentials}) {
    return new Promise((resolve) => {
      commit(mutationTypes.followUserStart);

      followUserApi
        .followUser({slug, credentials})
        .then((article) => {
          commit(mutationTypes.followUserSuccess, article);
          resolve(article);
        })
        .catch((errors) => {
          commit(mutationTypes.followUserFailure, errors.resonse.data.errors);
        });
    });
  },

  [actionTypes.unfollowUser]({commit}, {slug, credentials}) {
    return new Promise((resolve) => {
      commit(mutationTypes.followUserStart);

      followUserApi
        .unfollowUser({slug, credentials})
        .then((article) => {
          commit(mutationTypes.followUserSuccess, article);
          resolve(article);
        })
        .catch((errors) => {
          commit(mutationTypes.followUserFailure, errors.resonse.data.errors);
        });
    });
  },
};

export default {
  mutations,
  actions,
};
