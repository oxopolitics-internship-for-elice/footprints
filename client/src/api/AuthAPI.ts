import { AxiosResponse } from 'axios';
import * as Api from './Api';

interface IAuthAPI {
  getKaKao(): Promise<AxiosResponse<any>>; // response type 선언 후 수정
}

const AuthAPI: IAuthAPI = (() => {
  // const somethingCommon = () => { /* ... */ };

  return {
    getKaKao: () => {
      // somethingCommon();

      return Api.get(`auth/kakao`);
    },
  };
})();

export default AuthAPI;
