import { AxiosResponse } from 'axios';
import * as Api from './AxiosService';

interface IStandbyIssueAPI {
  getList(target: string, pageNum: number): Promise<AxiosResponse<any>>; // response type 선언 후 수정
}

const StandbyIssueAPI: IStandbyIssueAPI = (() => {
  // const somethingCommon = () => { /* ... */ };

  return {
    getList: (target, pageNum) => {
      // somethingCommon();

      return Api.get(
        `issues?targetPolitician=${target}&perPage=10&pageNum=${pageNum}`,
      );
    },
  };
})();

export default StandbyIssueAPI;
