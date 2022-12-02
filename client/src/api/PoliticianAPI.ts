import { politicianResponse } from '@/types/PoliticiansTypes';
import { AxiosResponse } from 'axios';
import AxiosService from './AxiosService';

export interface postIssueBody {
  targetPolitician: string;
  issueDate: Date;
  title: string;
  content: string;
  link?: string;
}

export interface postIssueReponse {
  message: string;
}
interface IPoliticianAPI {
  getList(): Promise<AxiosResponse<politicianResponse>>;
  postIssue(body: postIssueBody): Promise<AxiosResponse<postIssueReponse>>;
}

class PoliticianAPI implements IPoliticianAPI {
  getList() {
    return AxiosService.get<politicianResponse>(`politicians`);
  }
  postIssue(body: postIssueBody) {
    return AxiosService.post<postIssueReponse>(`issues`, body);
  }
}

export default new PoliticianAPI();
