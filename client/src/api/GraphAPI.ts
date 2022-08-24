import { AxiosResponse } from 'axios';
import * as Api from './Api';

interface GraphAPI {
  getGraph(targetPolitician: String): Promise<AxiosResponse<any>>;
}

const GraphAPI: GraphAPI = (() => {
  return {
    getGraph: targetPolitician => {
      return Api.get(
        `issues?targetPolitician=${targetPolitician}&regiStatus=true&perPage=10&pageNum=1`,
      );
    },
  };
})();

export default GraphAPI;
