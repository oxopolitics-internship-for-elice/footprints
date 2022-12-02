import { IssueMeta, IssueType } from '@/types/IssueTypes';
import { AxiosResponse } from 'axios';
import AxiosService from './AxiosService';

export interface GetStandByIssueListResponse {
  data: IssueType[];
  meta: IssueMeta;
}
export type GetTopIssueListReponse = IssueType[];

interface PatchRegiBody {
  con: boolean;
  pro: boolean;
}

interface IssueRegiResponse {
  message: string;
  hasVoted: string;
}

interface IIssueAPI {
  getStanbyList(
    targetPolitician: string,
    pageNum: number,
  ): Promise<AxiosResponse<GetStandByIssueListResponse>>;
  getTopList(
    targetPolitician: string,
  ): Promise<AxiosResponse<GetTopIssueListReponse>>;
  patchRegi(
    target: string,
    result: PatchRegiBody,
  ): Promise<AxiosResponse<IssueRegiResponse>>;
}

class IssueAPI implements IIssueAPI {
  getStanbyList(targetPolitician: string, pageNum: number) {
    return AxiosService.get<GetStandByIssueListResponse>(`issues`, {
      params: {
        targetPolitician,
        perPage: 10,
        pageNum,
      },
    });
  }
  getTopList(targetPolitician: string) {
    return AxiosService.get<GetTopIssueListReponse>(`issues`, {
      params: {
        targetPolitician,
        ranked: true,
      },
    });
  }
  patchRegi(target: string, result: PatchRegiBody) {
    return AxiosService.patch<IssueRegiResponse>(
      `issues/${target}/regi`,
      result,
    );
  }
}

export default new IssueAPI();
