import PoliticianAPI from '@/api/PoliticianAPI';
import { selector } from 'recoil';

const PoliticansState = selector({
  key: 'PoliticansState',
  get: async () => {
    const response = await PoliticianAPI.getList();
    return response.data;
  },
});

export default PoliticansState;
