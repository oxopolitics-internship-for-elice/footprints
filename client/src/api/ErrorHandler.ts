import { Alert } from '@/components/base/Alert';
import axios, { AxiosError } from 'axios';

const errorHandler = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    const errorStatus = axiosError.response?.status;
    if (errorStatus === 401) {
      Alert.fire({
        icon: 'error',
        title: '로그인이 필요합니다.(401)',
      });
    } else if (errorStatus === 403) {
      Alert.fire({
        icon: 'error',
        title: '권한이 없습니다.(403)',
      });
    } else if (errorStatus === 404) {
      Alert.fire({
        icon: 'error',
        title: '존재하지 않는 페이지입니다.(404)',
      });
    } else if (errorStatus === 500) {
      Alert.fire({
        icon: 'error',
        title: '서버에 오류가 발생했습니다.(500)',
      });
    } else {
      Alert.fire({
        icon: 'error',
        title: '알 수 없는 오류가 발생했습니다.',
      });
    }
    return error;
  } else {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);

    Alert.fire({
      icon: 'error',
      title: `에러:${message}`,
    });
    return error;
  }
};

export default errorHandler;
