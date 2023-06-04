import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import Cookies from 'js-cookie';
import { signOut } from 'next-auth/react';
import queryString from 'query-string';

export default abstract class AsyncHttpClient {
  protected readonly instance: AxiosInstance;

  constructor(baseURL: string) {
    const accessToken = Cookies.get('token');

    const headers: any = {
      'content-type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    };
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    // if (accessToken !== null && accessToken !== undefined && accessToken !== '')
    this.instance = axios.create({
      baseURL,
      headers,
      paramsSerializer: (params) => queryString.stringify(params),
    });

    this.responseInterceptor();
  }

  /*
   * When response code is 401, try to refresh the token.
   * Eject the interceptor so it doesn't loop in case
   * token refresh causes the 401 response
   */
  // axios.interceptors.response.eject(interceptor);
  private responseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this.handleError
    );
  };

  private _handleResponse = ({ data, status }: AxiosResponse): any => ({
    data,
    status,
  });

  protected handleError = (error: any) => {
    if (error?.response?.status === 401) {
      Cookies.remove('portal-token');
      localStorage.removeItem('userInfo');
      signOut({
        callbackUrl: '/',
        redirect: true,
      });
      window.location.reload();
    }
    throw error;
  };
}
