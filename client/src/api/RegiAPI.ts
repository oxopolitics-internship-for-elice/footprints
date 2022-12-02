import { AxiosResponse } from 'axios';
import AxiosService from './AxiosService';

interface IRegiAPI {
  patch(target: string, result: object): Promise<AxiosResponse<any>>;
}

class RegiAPI implements IRegiAPI {
  patch(target: string, result: object) {
    return AxiosService.patch(`issues/${target}/regi`, result);
  }
}

export default new RegiAPI();
