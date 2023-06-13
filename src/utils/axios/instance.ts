import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import Cookies from 'js-cookie';
import type { IResponse } from './entities';

const axiosService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL_DEV as string,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosService.interceptors.request.use(async (config) => {
  const accessToken = Cookies.get('auth-token');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosService.interceptors.response.use(
  (res) => {
    return Promise.resolve(res);
  },
  (err) => {
    return Promise.reject(err);
  }
);

// @ts-ignore
const refreshAuthLogic = async (failedRequest) => {
  const token = Cookies.get('token');
  const refreshToken = Cookies.get('refreshToken');

  if (token && refreshToken) {
    return axios
      .post(
        '/refresh-token',
        {
          accessToken: token,
          refreshToken: refreshToken,
        },
        {
          baseURL: process.env.NEXT_PUBLIC_API_AUTH_URL as string,
        }
      )
      .then((tokenRefreshResponse) => {
        const { accessToken } = tokenRefreshResponse.data;
        failedRequest.response.config.headers.Authorization = `Bearer ${accessToken}`;
        Cookies.set('auth-token', tokenRefreshResponse.data.accessToken);
        Cookies.set('refresh-token', tokenRefreshResponse.data.refreshToken);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
        }
      });
  }
};

createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

export const apiLogin = async (
  url: string,
  payload: any
): Promise<IResponse> => {
  const response = await axios.post(url, payload, {
    baseURL: process.env.NEXT_PUBLIC_API_AUTH_URL as string,
  });
  return response;
};

export const apiGet = async <T = any>(url: string): Promise<IResponse> => {
  const response = await axiosService.get<T>(url);

  return response;
};

export const apiPost = async <T = any>(
  url: string,
  payload: any
): Promise<IResponse> => {
  const response = await axiosService.post<T>(url, payload);
  return response;
};

export const apiPostPhoto = async <T = any>(
  url: string,
  payload: any
): Promise<IResponse> => {
  const response = await axiosService.post<T>(url, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export const apiPatch = async <T = any>(
  url: string,
  payload: any
): Promise<IResponse> => {
  const response = await axiosService.patch<T>(url, payload);
  return response;
};

export const apiDelete = async <T = any>(url: string): Promise<IResponse> => {
  const response = await axiosService.delete<T>(url);
  return response;
};

export default axiosService;
