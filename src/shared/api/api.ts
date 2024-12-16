import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axiosRetry from "axios-retry";
import { camelizeKeys } from "humps";
import { getToken } from "./token";

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: process.env.API_URL || `${window.location.origin}/api`,
    timeout: 10000,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  });

  api.interceptors.response.use((response: AxiosResponse) => {
    if (response.data && response.headers["content-type"] === "application/json") {
      response.data = camelizeKeys(response.data);
    }

    return response;
  });

  axiosRetry(api, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
    // retryCondition(error) {
    //   switch (error.response!.status) {
    //     //retry only if status is 500 or 501
    //     case 404:
    //     case 500:
    //     case 501:
    //       return true;
    //     default:
    //       return false;
    //   }
    // },
    // onRetry: (retryCount, requestConfig) => {
    //   if (retryCount == 2) {
    //     requestConfig.config!.baseURL = process.env.API_URL;
    //   }
    // },
  });

  return api;
};
