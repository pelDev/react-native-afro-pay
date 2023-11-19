import axiosInstance from '../libs/axiosInstance';
import type { LoginFormInput } from '../types';

async function postLogin(data: LoginFormInput) {
  return axiosInstance.post('/auth/login', data);
}

async function getLoggedInUser() {
  return axiosInstance.get('/auth/me');
}

export { postLogin, getLoggedInUser };
