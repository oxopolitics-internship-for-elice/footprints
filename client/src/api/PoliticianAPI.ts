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

const PoliticianAPI: IPoliticianAPI = (() => {
  // const somethingCommon = () => { /* ... */ };

  return {
    getList: () => {
      // somethingCommon();

      return AxiosService.get(`politicians`);
    },
    postIssue: (body: postIssueBody) => {
      return AxiosService.post(`issues`, body);
    },
  };
})();

export default PoliticianAPI;
