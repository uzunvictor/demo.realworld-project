export const getItem = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.log('Error getting data from local storage', error);
    return null;
  }
};

export const setItem = (key, value) => {
  try {
    return localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log('Error setting data to local storage', error);
  }
};
