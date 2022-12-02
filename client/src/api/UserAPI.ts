import { AxiosResponse } from 'axios';
import * as Api from './AxiosService';

interface IUserAPI {
  getUserByEmail(email: string): Promise<AxiosResponse<any>>; // response type 선언 후 수정
}

const UserAPI: IUserAPI = (() => {
  // const somethingCommon = () => { /* ... */ };

  return {
    getUserByEmail: (email: string) => {
      // somethingCommon();

      return Api.get(`users/${email}`);
    },
  };
})();

export default UserAPI;
