import { AxiosResponse } from 'axios';
import * as Api from './api';

interface GraphAPI {
  getGraph(
    targetPolitician: String,
    index: Number,
  ): Promise<AxiosResponse<any>>;
  updatePoll(target: String, newPoll: Object): Promise<AxiosResponse<any>>;
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
  };
})();

export default GraphAPI;
