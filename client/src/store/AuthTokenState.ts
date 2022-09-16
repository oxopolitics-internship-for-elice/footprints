import { atom, selector } from 'recoil';

interface AuthTokenState {
  access_token: string;
}

export const authTokenState = atom<AuthTokenState>({
  key: 'authTokenState',
  default: {
    access_token: '',
  },
});

export const isLogined = selector({
  key: 'isLogined',
  get: ({ get }) => {
    const authToken = get(authTokenState);
    return authToken.access_token !== '';
  },
});
