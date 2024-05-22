import axios from 'axios';




export function setAuthorizationToken(token) {

  axios.interceptors.request.use(
    (config) => {
      console.log('intercept', config);
      if (token) {
        config.headers.Authorization = `${token}`;
      } else {
        delete config.headers.Authorization;
      }
      return config;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('current_token');
        window.location = '/login';
        // navigate('/login');
      }
      return Promise.reject(error);
    }
  );




}