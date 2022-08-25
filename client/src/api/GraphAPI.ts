import { AxiosResponse } from 'axios';
import * as Api from './Api';

interface GraphAPI {
  getGraph(
    targetPolitician: String,
    index: Number,
  ): Promise<AxiosResponse<any>>;
}

const GraphAPI: GraphAPI = (() => {
  return {
    getGraph: (targetPolitician, index) => {
      if (index === undefined) index = 1;
      return Api.get(
        `issues?targetPolitician=${targetPolitician}&regiStatus=true&perPage=10&pageNum=${index}`,
      );
    },
  };
})();

export default GraphAPI;
