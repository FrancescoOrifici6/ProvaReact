import axios from 'axios';


export function setAuthorizationToken(token) {


    axios.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `${token}`;
        } else {
          delete config.headers.Authorization;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }