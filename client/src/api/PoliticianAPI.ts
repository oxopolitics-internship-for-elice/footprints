import { AxiosResponse } from 'axios';
import * as Api from './AxiosService';

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

      return Api.get(`politicians`);
    },
    postIssue: (body: postIssueBody) => {
      return Api.post(`issues`, body);
    },
  };
})();

export default PoliticianAPI;
