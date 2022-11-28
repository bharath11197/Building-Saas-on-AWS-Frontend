import axios from 'axios';
import { BASE_API_URL } from './helper';

axios.interceptors.request.use(
  function (config) {
    const authToken = localStorage.getItem('token');
    config.headers[`Authorization`] = authToken;
    config.baseURL = BASE_API_URL;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const axiosService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch
};

export default axiosService;