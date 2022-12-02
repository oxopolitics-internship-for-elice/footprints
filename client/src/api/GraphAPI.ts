import { GetGraphData, GetGraphMeta } from '@/types/GraphTypes';
import { AxiosResponse } from 'axios';
import AxiosService from './AxiosService';
export interface GetGraphResponse {
  data: GetGraphData[];
  meta: GetGraphMeta;
}

export interface UpdatePollBody {
  pro: boolean;
  neu: boolean;
  con: boolean;
}

type pollType = 'pro' | 'neu' | 'con';

export interface UpdatePollResponse {
  message: string;
  now: pollType;
}

export interface getPollInfoResponse {
  message: string;
  now: pollType | null;
}
interface GraphAPI {
  getGraph(
    targetPolitician: string,
    index: Number,
  ): Promise<AxiosResponse<GetGraphResponse>>;
  updatePoll(
    target: string,
    newPoll: UpdatePollBody,
  ): Promise<AxiosResponse<UpdatePollResponse>>;
  getPollInfo(target: string): Promise<AxiosResponse<getPollInfoResponse>>;
}

class GraphAPI implements GraphAPI {
  getGraph(targetPolitician: string, index: Number) {
    return AxiosService.get<GetGraphResponse>(
      `issues?targetPolitician=${targetPolitician}&regiStatus=true&perPage=10&pageNum=${index}`,
    );
  }

  updatePoll(target: string, newPoll: UpdatePollBody) {
    return AxiosService.patch<UpdatePollResponse>(
      `issues/${target}/poll`,
      newPoll,
    );
  }

  getPollInfo(target: string) {
    return AxiosService.get<getPollInfoResponse>(`issues/${target}/poll`);
  }
}

export default new GraphAPI();
