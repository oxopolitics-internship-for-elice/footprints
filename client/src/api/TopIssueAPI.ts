import { AxiosResponse } from 'axios';
import * as Api from './AxiosService';

interface ITopIssueAPI {
  getList(target: string): Promise<AxiosResponse<any>>; // response type 선언 후 수정
}

const TopIssueAPI: ITopIssueAPI = (() => {
  // const somethingCommon = () => { /* ... */ };

  return {
    getList: (target: string) => {
      // somethingCommon();

      return Api.get(`issues?targetPolitician=${target}&ranked=true`);
    },
  };
})();

export default TopIssueAPI;
