import { AxiosResponse } from 'axios';
import * as Api from './api';

interface GraphAPI {
  getGraph(
    targetPolitician: String,
    index: Number,
  ): Promise<AxiosResponse<any>>;
}

const GraphAPI: GraphAPI = (() => {
  return {
    getGraph: (targetPolitician, index) => {
      return Api.get(
        `issues?targetPolitician=${targetPolitician}&regiStatus=true&perPage=10&pageNum=${index}`,
      );
    },
  };
})();

export default GraphAPI;
