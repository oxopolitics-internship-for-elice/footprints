import { Axios } from 'axios';
import { getCookie } from '@/utils/Cookie';
import errorHandler from './ErrorHandler';

class AxiosService extends Axios {
  constructor() {
    super();
    this.interceptors.request.use(
      config => {
        const serverUrl = (() => {
          if (import.meta.env.MODE === 'development') {
            const localServerPort = 5000;
            const { protocol, hostname } = window.location;
            return `${protocol}//${hostname}:${localServerPort}/`;
          }
          return `http://politician-footprints.site:8080/`;
        })();
        config.headers = {
          Authorization: `Bearer ${getCookie('access_token')}`,
          ContentType: 'application/json',
        };
        config.baseURL = serverUrl;
        config.timeout = 10000;
        config.withCredentials = true;
        return config;
      },
      error => {
        errorHandler(error);
        return Promise.reject(error);
      },
    );
  }
}

export default new AxiosService();
