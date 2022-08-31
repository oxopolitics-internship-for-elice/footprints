import { AxiosResponse } from 'axios';
import * as Api from './Api';

interface IRegiAPI {
  patch(target: string, result: object): Promise<AxiosResponse<any>>;
}

const RegiAPI: IRegiAPI = (() => {
  // const somethingCommon = () => { /* ... */ };

  return {
    patch: (target, result) => {
      // somethingCommon();

      return Api.patch(`issues/${target}/regi`, result);
    },
  };
})();

export default RegiAPI;
