import Cookies from 'js-cookie';

const AUTH_TOKEN_KEY_NAME = 'token';

export type Token = string;

export const getToken = (): Token => {
  return Cookies.get(AUTH_TOKEN_KEY_NAME) ?? '';
};

export const setToken = (token: Token): void => {
  Cookies.set(AUTH_TOKEN_KEY_NAME, token, {
    path: '/',
    expires: 7
  });
};

export const clearToken = (): void => {
  Cookies.remove(AUTH_TOKEN_KEY_NAME);
};
