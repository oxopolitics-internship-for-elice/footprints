import { atom, selector } from 'recoil';
import { IssueTypes } from '@/types/IssueTypes';
import * as api from '@/api/api';

export const issueState = selector({
  key: 'issueSelector',
  get: async () => {
    const response = await api.get('/IssueMockData.json');
    return response.data;
  },
});

export const issueDateState = selector({
  key: 'issueDateState',
  get: ({ get }) => {
    const issues = get(issueState);
    const issueDate = issues.map(
      (issue: { issueDate: Date }) => issue.issueDate,
    );
    return issueDate;
  },
});
