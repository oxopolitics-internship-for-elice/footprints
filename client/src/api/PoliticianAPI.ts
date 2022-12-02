import { politicianResponse } from '@/types/PoliticiansTypes';
import { AxiosResponse } from 'axios';
import AxiosService from './AxiosService';

export type postIssueBody = {
  targetPolitician: string;
  issueDate: Date;
  title: string;
  content: string;
  link?: string;
};

type postIssueReponse = {
  message: string;
};
interface IPoliticianAPI {
  getList(): Promise<AxiosResponse<politicianResponse>>;
  postIssue(body: postIssueBody): Promise<AxiosResponse<postIssueReponse>>;
}

class PoliticianAPI implements IPoliticianAPI {
  getList(): Promise<AxiosResponse<politicianResponse>> {
    return AxiosService.get(`politicians`);
  }
  postIssue(body: postIssueBody): Promise<AxiosResponse<postIssueReponse>> {
    return AxiosService.post(`issues`, body);
  }
}

export default new PoliticianAPI();
