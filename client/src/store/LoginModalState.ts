import { atom, selector } from 'recoil';

interface LoginModalState {
  isOpen: boolean;
}

export const loginModalState = atom<LoginModalState>({
  key: 'loginModalState',
  default: {
    isOpen: false,
  },
});

export const isLoginModalOpen = selector({
  key: 'isLoginModalOpen',
  get: ({ get }) => {
    const loginModal = get(loginModalState);
    return loginModal.isOpen;
  },
});
