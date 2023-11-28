import axios, { AxiosInstance } from 'axios';

const BACKEND_URL = '//194.58.97.43:8401/api/calc/manufacturers';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  return api;
};
