import { generateCookiesKeyValues } from '../auth';
import { postReissue } from '@/apis/auth';
import { ApiError } from '@/apis/config/customError';
import { isServer } from '@/constants';
import { CookieKeyType } from '@/types';

export const getAccessTokenServer = async (
  authTokens: CookieKeyType
): Promise<string | null | ApiError> => {
  try {
    const { accessToken, refreshToken, userId } = authTokens;
    if (accessToken && refreshToken) {
      const response = await postReissue({ accessToken, refreshToken });
      if (
        response.token.accessToken === undefined ||
        response.token.refreshToken === undefined ||
        userId === undefined
      ) {
        return null;
      }
      if (isServer) {
        const { cookies } = await import('next/headers');
        const cookieStore = cookies();
        for (const [cookieKey, cookieValue] of generateCookiesKeyValues({
          accessToken: response.token.accessToken,
          refreshToken: response.token.refreshToken,
          userId,
        })) {
          cookieStore.set(cookieKey as string, cookieValue as string);
        }
      } else {
        for (const [cookieKey, cookieValue] of generateCookiesKeyValues({
          accessToken: response.token.accessToken,
          refreshToken: response.token.refreshToken,
          userId,
        })) {
          document.cookie = `${cookieKey}=${cookieValue}; path=/;`;
        }
      }
      return response.token.accessToken;
    } else {
      return null;
    }
  } catch (e) {
    return e as ApiError;
  }
};