import { selector } from 'recoil';
import axios from 'axios';

const issueState = selector({
  key: 'issueSelector',
  get: async () => {
    const response = await axios.get('/IssueMockData.json');
    return response.data;
  },
});

export default issueState;
