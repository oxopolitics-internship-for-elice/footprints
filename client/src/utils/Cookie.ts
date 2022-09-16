import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const getCookie = (name: string) => cookies.get(name);
export const setCookie = (name: string, value: string, option?: any) =>
  cookies.set(name, value, { ...option });
export const removeCookie = (name: string) => cookies.remove(name);
