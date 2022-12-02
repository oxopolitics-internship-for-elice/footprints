import { AxiosResponse } from 'axios';
import AxiosService from './AxiosService';

interface IIssueAPI {
  getStanbyList(target: string, pageNum: number): Promise<AxiosResponse<any>>;
  getTopList(target: string): Promise<AxiosResponse<any>>;
  patchRegi(target: string, result: object): Promise<AxiosResponse<any>>;
}

class IssueAPI implements IIssueAPI {
  getStanbyList(target: string, pageNum: number) {
    return AxiosService.get(
      `issues?targetPolitician=${target}&perPage=10&pageNum=${pageNum}`,
    );
  }
  getTopList(target: string) {
    return AxiosService.get(`issues?targetPolitician=${target}&ranked=true`);
  }
  patchRegi(target: string, result: object) {
    return AxiosService.patch(`issues/${target}/regi`, result);
  }
}

export default new IssueAPI();
