import axios from '@/api/axios';

export const popularTagsRequest = () => {
  return axios.get('/tags').then((result) => result.data.tags);
};
