import Cookies from "js-cookie";

export const AUTH_TOKEN_KEY_NAME = "ccc-auth-token";

export type Token = string;

export const getToken = (): Token => {
  const token = Cookies.get(AUTH_TOKEN_KEY_NAME);

  return token ?? "";
};

export const setToken = (token: Token): void => {
  Cookies.set(AUTH_TOKEN_KEY_NAME, token, {
    path: "/",
    expires: 1,
    sameSite: "lax",
    // secure: true,
  });
};

export const clearToken = (): void => {
  Cookies.remove(AUTH_TOKEN_KEY_NAME);
};
