import { AxiosResponse } from 'axios';
import AxiosService from './AxiosService';

interface IRegiAPI {
  patch(target: string, result: object): Promise<AxiosResponse<any>>;
}

const RegiAPI: IRegiAPI = (() => {
  return {
    patch: (target, result) => {
      return AxiosService.patch(`issues/${target}/regi`, result);
    },
  };
})();

export default RegiAPI;
