import { AxiosResponse } from 'axios';
import * as Api from './Api';

interface GraphAPI {
  getGraph(
    targetPolitician: string,
    index: Number,
  ): Promise<AxiosResponse<any>>;
  updatePoll(target: string, newPoll: Object): Promise<AxiosResponse<any>>;
  getPollInfo(target: string): Promise<AxiosResponse<any>>;
}

const GraphAPI: GraphAPI = (() => {
  return {
    getGraph: (targetPolitician, index) => {
      return Api.get(
        `issues?targetPolitician=${targetPolitician}&regiStatus=true&perPage=10&pageNum=${index}`,
      );
    },
    updatePoll: (target, newPoll) => {
      return Api.patch(`issues/${target}/poll`, newPoll);
    },
    getPollInfo: target => {
      return Api.get(`issues/${target}/poll`);
    },
  };
})();

export default GraphAPI;
