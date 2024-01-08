import axios, { AxiosInstance, AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';
import { camelizeKeys } from 'humps';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: process.env.API_URL,
    timeout: 6000,
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

  axiosRetry(api, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
  });

  return api;
};
