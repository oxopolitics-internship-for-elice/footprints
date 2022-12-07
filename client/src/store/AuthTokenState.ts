import { atom, selector } from 'recoil';

export interface AuthTokenState {
  access_token: string;
}

export const authTokenState = atom<AuthTokenState>({
  key: 'authTokenState',
  default: {
    access_token: '',
  },
});
