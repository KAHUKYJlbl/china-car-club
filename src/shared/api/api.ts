import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { camelizeKeys } from 'humps';

const BACKEND_URL = 'https://admin.new.chinacar.club/api/calc/manufacturers'
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
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
