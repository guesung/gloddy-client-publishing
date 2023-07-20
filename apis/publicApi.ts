import axios from 'axios';

import { BASE_API_URL } from '@/constants';

import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const publicApi = axios.create({
  baseURL: BASE_API_URL,
});

function onRequest(config: InternalAxiosRequestConfig) {
  return config;
}

function onResponse(response: AxiosResponse) {
  return response;
}

function onResponseError(error: AxiosError) {
  return Promise.reject(error);
}

publicApi.interceptors.request.use(onRequest);
publicApi.interceptors.response.use(onResponse, onResponseError);

export default publicApi;