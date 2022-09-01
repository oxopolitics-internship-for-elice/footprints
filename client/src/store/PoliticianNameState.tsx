import { selector } from 'recoil';
import PoliticansState from './PoliticiansState';

const PoliticanNameState = selector({
  key: 'PoliticanNameState',
  get: ({ get }) => {
    const Politicians = get(PoliticansState);
    return Politicians.map((politician: any) => {
      return { [politician._id]: politician.politicianInfo[0].name };
    });
  },
});

export default PoliticanNameState;
