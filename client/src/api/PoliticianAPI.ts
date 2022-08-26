import { AxiosResponse } from 'axios';
import * as Api from './Api';

interface IPoliticianAPI {
  getList(): Promise<AxiosResponse<any>>; // response type 선언 후 수정
}

const PoliticianAPI: IPoliticianAPI = (() => {
  // const somethingCommon = () => { /* ... */ };

  return {
    getList: () => {
      // somethingCommon();

      return Api.get(`politicians`);
    },
  };
})();

export default PoliticianAPI;
