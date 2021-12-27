import axios from '@/api/axios';

const getUrl = (slug) => `/articles/${slug}/favorite`;

const addtoFavoritesArticle = (slug) => {
  const url = getUrl(slug);
  return axios.post(url).then((response) => response.data.article);
};

const deleteFromFavoritesArticle = (slug) => {
  const url = getUrl(slug);
  return axios.delete(url).then((response) => response.data.article);
};

export default {
  addtoFavoritesArticle,
  deleteFromFavoritesArticle,
};
