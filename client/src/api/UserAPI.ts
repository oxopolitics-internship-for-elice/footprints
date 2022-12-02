import { AxiosResponse } from 'axios';
import AxiosService from './AxiosService';

interface IUserAPI {
  getUserByEmail(email: string): Promise<AxiosResponse<any>>; // response type 선언 후 수정
}

class UserAPI implements IUserAPI {
  getUserByEmail(email: string) {
    return AxiosService.get(`users/${email}`);
  }
}

export default new UserAPI();
