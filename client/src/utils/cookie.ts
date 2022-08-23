import { useCookies } from 'react-cookie';

export const [accessCookies, setaccessCookie, removeAccessCookie] = useCookies([
  'accessToken',
]);

export const { accessToken } = accessCookies;
