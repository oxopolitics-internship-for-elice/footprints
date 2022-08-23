import { useCookies } from 'react-cookie';

export const [Cookies, setCookie, removeCookie] = useCookies(['accessToken']);

export const { accessToken } = Cookies;
