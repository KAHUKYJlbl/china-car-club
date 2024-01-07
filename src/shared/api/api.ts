import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { camelizeKeys } from 'humps';

const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: process.env.API_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use((response: AxiosResponse) => {
    if (
      response.data &&
      response.headers['content-type'] === 'application/json'
    ) {
      response.data = camelizeKeys(response.data);
    }

    return response;
  });

  return api;
};
