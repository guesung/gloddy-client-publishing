import { CustomInstance } from './type';
import { BASE_API_URL } from '@/constants';
import { getTokenFromCookie } from '@/utils/auth/tokenController';
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const privateApiNotification: CustomInstance = axios.create({
  baseURL: `${BASE_API_URL}/api/v1`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  responseType: 'json',
});

privateApiNotification.defaults.timeout = 2500;

privateApiNotification.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const { userId } = await getTokenFromCookie();
      config.headers['USER_ID'] = userId;
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error: AxiosError) => {
    Promise.reject(error);
  }
);

privateApiNotification.interceptors.response.use((response: AxiosResponse) => {
  return response.data;
});

export { privateApiNotification };
