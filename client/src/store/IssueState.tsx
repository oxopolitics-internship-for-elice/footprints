import { selector } from 'recoil';
import * as Api from '@/api/api';

const issueState = selector({
  key: 'issueSelector',
  get: async () => {
    const response = await Api.get(
      `issues?targetPolitician=6303bed2e9d44f884ed1d640&regiStatus=true`,
    );
    return response.data;
  },
});

export default issueState;
