import { selector } from 'recoil';
import issueState from './IssueState';

const issueDateState = selector({
  key: 'issueDateState',
  get: ({ get }) => {
    const issues = get(issueState);
    const issueDate = issues.map(
      (issue: { issueDate: Date }) => issue.issueDate,
    );
    return issueDate;
  },
});

export default issueDateState;
