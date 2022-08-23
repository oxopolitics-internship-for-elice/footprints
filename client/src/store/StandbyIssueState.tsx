import { atom } from 'recoil';
import { IssueTypes } from '@/types/IssueTypes';

export const standbyIssueState = atom<IssueTypes[]>({
  key: 'standbyIssueState',
  default: undefined,
});
