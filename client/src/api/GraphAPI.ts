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

class GraphAPI implements GraphAPI {
  getGraph(targetPolitician: string, index: Number) {
    return AxiosService.get(
      `issues?targetPolitician=${targetPolitician}&regiStatus=true&perPage=10&pageNum=${index}`,
    );
  }

  updatePoll(target: string, newPoll: Object) {
    return AxiosService.patch(`issues/${target}/poll`, newPoll);
  }

  getPollInfo(target: string) {
    return AxiosService.get(`issues/${target}/poll`);
  }
}

export default new GraphAPI();
