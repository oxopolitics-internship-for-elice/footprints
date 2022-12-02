import { AxiosResponse } from 'axios';
import AxiosService from './AxiosService';

export type postIssueBody = {
  targetPolitician: string;
  issueDate: Date;
  title: string;
  content: string;
  link?: string;
};
interface IPoliticianAPI {
  getList(): Promise<AxiosResponse<any>>;
  postIssue(body: postIssueBody): Promise<AxiosResponse<any>>;
}

class PoliticianAPI implements IPoliticianAPI {
  getList(): Promise<AxiosResponse<any>> {
    return AxiosService.get(`politicians`);
  }
  postIssue(body: postIssueBody): Promise<AxiosResponse<any>> {
    return AxiosService.post(`issues`, body);
  }
}

export default new PoliticianAPI();
