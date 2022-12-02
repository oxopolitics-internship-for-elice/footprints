import { AxiosResponse } from 'axios';
import AxiosService from './AxiosService';

interface ITopIssueAPI {
  getList(target: string): Promise<AxiosResponse<any>>; // response type 선언 후 수정
}

const TopIssueAPI: ITopIssueAPI = (() => {
  return {
    getList: (target: string) => {
      return AxiosService.get(`issues?targetPolitician=${target}&ranked=true`);
    },
  };
})();

export default TopIssueAPI;
