import axios from '@/api/axios';

const followUser = ({slug, credentials}) => {
  return axios.post(`/profiles/${slug}/follow`, {profile: {credentials}});
};

const unfollowUser = ({slug, credentials}) => {
  return axios.delete(`profiles/${slug}/follow`, {profile: {credentials}});
};

export default {
  followUser,
  unfollowUser,
};
