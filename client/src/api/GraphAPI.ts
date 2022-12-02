import { AxiosResponse } from 'axios';
import AxiosService from './AxiosService';

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
      return AxiosService.get(
        `issues?targetPolitician=${targetPolitician}&regiStatus=true&perPage=10&pageNum=${index}`,
      );
    },
    updatePoll: (target, newPoll) => {
      return AxiosService.patch(`issues/${target}/poll`, newPoll);
    },
    getPollInfo: target => {
      return AxiosService.get(`issues/${target}/poll`);
    },
  };
})();

export default GraphAPI;
