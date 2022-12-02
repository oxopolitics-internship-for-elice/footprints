import Axios from 'axios';
import { getCookie } from '@/utils/Cookie';
import errorHandler from './ErrorHandler';

const serverURL = (() => {
  if (import.meta.env.MODE === 'development') {
    const localServerPort = 5000;
    const { protocol, hostname } = window.location;
    return `${protocol}//${hostname}:${localServerPort}/`;
  }
  return `http://politician-footprints.site:8080/`;
})();

const AxiosService = Axios.create();

AxiosService.interceptors.request.use(
  config => {
    config.headers = {
      Authorization: `Bearer ${getCookie('access_token')}`,
      ContentType: 'application/json',
    };
    config.baseURL = serverURL;
    config.timeout = 10000;
    return config;
  },
  error => {
    errorHandler(error);
    return Promise.reject(error);
  },
);

export default AxiosService;
