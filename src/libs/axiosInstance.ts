import axios from 'axios';
import * as storage from '../utils/AsyncStorage';

let headers = {
  'content-type': 'application/json',
};

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await storage.getToken();

    console.log(token ? 'Token exists' : 'Token does not exist');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['content-type'] = 'application/json';
      config.headers.Accept = 'application/json';
    }

    return config;
  },
  (error) => {
    console.log('Error from axios', error);
    Promise.reject(error);
  }
);

export default axiosInstance;
