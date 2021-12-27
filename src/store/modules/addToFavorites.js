import addToFavoritesApi from '@/api/addToFavorites';

export const mutationTypes = {
  addToFavoritesStart: '[addToFavorites] addToFavoritesStart',
  addToFavoritesSuccess: '[addToFavorites] addToFavoritesSuccess',
  addToFavoritesFailure: '[addToFavorites] addToFavoritesFailure',
};

export const actionTypes = {
  addToFavorites: '[addToFavorites] addToFavorites',
};

const mutations = {
  [mutationTypes.addToFavoritesStart]() {},
  [mutationTypes.addToFavoritesSuccess]() {},
  [mutationTypes.addToFavoritesFailure]() {},
};

const actions = {
  [actionTypes.addToFavorites]({commit}, {slug, isFavorited}) {
    return new Promise((resolve) => {
      commit(mutationTypes.addToFavoritesStart);

      const promise = isFavorited
        ? addToFavoritesApi.deleteFromFavoritesArticle(slug)
        : addToFavoritesApi.addtoFavoritesArticle(slug);

      promise
        .then((article) => {
          commit(mutationTypes.addToFavoritesSuccess, article);
          resolve(article);
        })
        .catch((errors) => {
          commit(
            mutationTypes.addToFavoritesFailure,
            errors.resonse.data.errors
          );
        });
    });
  },
};

export default {
  mutations,
  actions,
};
