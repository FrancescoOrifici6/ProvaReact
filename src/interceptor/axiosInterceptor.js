import { useKeycloak } from '@react-keycloak/web';
import axios from 'axios';



export function tokenHandling(params) {
  console.log('token-handling', params);


  sessionStorage.setItem('token_current', JSON.stringify(params))


  axios.interceptors.request.use(
    (config) => {
      // console.log('intercept', config);
      if (params) {
        config.headers.Authorization = `Bearer ${params.token}`;
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



export function setAuthorizationToken(token) {

  const KeyToken = useKeycloak();

  axios.interceptors.request.use(
    (config) => {
      // console.log('intercept', config);
      if (token) {
        config.headers.Authorization = `Bearer ${KeyToken.keycloak.token}`;
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