import axios from '@/api/axios';

export const getArticle = (slug) => {
  return axios.get(`/articles/${slug}`).then((response) => response.data.article);
};

export const deleteArticle = (slug) => {
  return axios.delete(`/articles/${slug}`);
};

export const createArticle = (articleInput) => {
  return axios
    .post('/articles', {article: articleInput})
    .then((response) => response.data.article);
};

export const updateArticle = (articleInput, slug) => {
  return axios
    .put(`/articles/${slug}`, {article: articleInput})
    .then((response) => response.data.article);
};
