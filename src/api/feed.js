import axios from '@/api/axios';

export const getFeedApi = (apiUrl) => {
  return axios.get(apiUrl);
};
