import { ApiError } from './customError';
import { postReissue } from '../auth';
import { BASE_API_URL } from '@/constants';
import { AUTH_ERROR_CODES } from '@/constants/errorCode';
import { getTokenFromCookie } from '@/utils/auth/tokenController';
import axios, { AxiosError, AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { redirect } from 'next/navigation';

import type { CustomInstance, ErrorType } from './type';

const privateApi: CustomInstance = axios.create({
  baseURL: `${BASE_API_URL}/api/v1`,
  withCredentials: true,
});

privateApi.defaults.timeout = 2500;

privateApi.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const { accessToken } = await getTokenFromCookie();
      if (accessToken) {
        config.headers['X-AUTH-TOKEN'] = accessToken;
        return config;
      }
      throw new Error('로그인이 필요합니다.');
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error: AxiosError) => {
    Promise.reject(error);
  }
);

privateApi.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  async (error: AxiosError<ErrorType, InternalAxiosRequestConfig>) => {
    try {
      if (error.response) {
        if (error.response.status === AUTH_ERROR_CODES.EXPIRED_TOKEN_ERROR) {
          try {
            const { refreshToken, accessToken, userId } = await getTokenFromCookie();

            if (!refreshToken || !accessToken || userId === undefined)
              throw new ApiError(
                '에러 발생',
                '토큰이 없습니다.',
                AUTH_ERROR_CODES.EXPIRED_TOKEN_ERROR,
                new Date()
              );

            const {
              token: { accessToken: reIssuedAccessToken, refreshToken: reIssuedRefreshToken },
            } = await postReissue({ accessToken, refreshToken });

            if (!reIssuedAccessToken || !reIssuedRefreshToken) {
              throw new ApiError(
                '에러 발생',
                'accessToken 발급중 오류가 발생했습니다.',
                AUTH_ERROR_CODES.EXPIRED_TOKEN_ERROR,
                new Date()
              );
            } else {
              const prevRequest = error.config;
              if (!prevRequest) {
                throw new ApiError(
                  '에러 발생',
                  '이전 정보가 없습니다.',
                  AUTH_ERROR_CODES.EXPIRED_TOKEN_ERROR,
                  new Date()
                );
              }
              prevRequest.headers['X-AUTH-TOKEN'] = reIssuedAccessToken;
              return privateApi(prevRequest);
            }
          } catch (e) {
            redirect('/join');
            return Promise.reject(e);
          }
        }
        console.log(error);
      } else {
        console.log('Error', error.message);
      }

      return Promise.reject(new Error('요청 도중 에러 발생'));
    } catch (e) {
      return Promise.reject(e);
    }
  }
);

export default privateApi;
