import { AxiosResponse } from 'axios';
import AxiosService from './AxiosService';

interface IStandbyIssueAPI {
  getList(target: string, pageNum: number): Promise<AxiosResponse<any>>; // response type 선언 후 수정
}

class StandbyIssueAPI implements IStandbyIssueAPI {
  getList(target: string, pageNum: number) {
    return AxiosService.get(
      `issues?targetPolitician=${target}&perPage=10&pageNum=${pageNum}`,
    );
  }
}

export default new StandbyIssueAPI();
