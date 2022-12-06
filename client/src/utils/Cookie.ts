import { Cookies } from 'react-cookie';

export interface CookieSetOptions {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: boolean | 'none' | 'lax' | 'strict';
  encode?: (value: string) => string;
}

const cookies = new Cookies();

export const getCookie = (name: string) => cookies.get(name);
export const setCookie = (
  name: string,
  value: string,
  option?: CookieSetOptions,
) => {
  cookies.set(name, value, { ...option });
};
export const removeCookie = (name: string) =>
  cookies.remove(name, { path: '/' });
