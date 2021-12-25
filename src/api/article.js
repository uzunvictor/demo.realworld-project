import axios from '@/api/axios';

export const getArticle = (slug) => {
  return axios.get(`/articles/${slug}`).then((result) => result.data.article);
};

export const deleteArticle = (slug) => {
  return axios.delete(`/articles/${slug}`);
};

export const createArticle = (articleInput) => {
  return axios
    .post('/articles', {article: articleInput})
    .then((result) => result.data.article);
};
