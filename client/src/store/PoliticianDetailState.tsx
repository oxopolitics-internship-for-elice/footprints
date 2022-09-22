import { selector } from 'recoil';
import PoliticansState from './PoliticiansState';

const PoliticanDetailState = selector({
  key: 'PoliticanDetailState',
  get: ({ get }) => {
    const Politicians = get(PoliticansState);
    return Politicians.map((politician: any) => {
      return {
        [politician._id]: {
          name: politician.name,
          img: politician.image,
          party: politician.party,
        },
      };
    });
  },
});

export default PoliticanDetailState;
