import { selector } from 'recoil';
import PoliticansState from './PoliticiansState';

const PoliticanDetailState = selector({
  key: 'PoliticanDetailState',
  get: ({ get }) => {
    const Politicians = get(PoliticansState);
    return Politicians.map((politician: any) => {
      const detail = politician.politicianInfo[0];
      return {
        [politician._id]: {
          name: detail.name,
          img: detail.image,
          party: detail.party,
        },
      };
    });
  },
});

export default PoliticanDetailState;
