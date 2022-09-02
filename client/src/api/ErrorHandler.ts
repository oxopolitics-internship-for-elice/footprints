import { Alert } from '@/components/base/Alert';
import axios, { AxiosError } from 'axios';

const errorHandler = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    Alert.fire({
      icon: 'error',
      title: `error message:${error.message}`,
    });
    return error.message;
  } else {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);

    Alert.fire({
      icon: 'error',
      title: `error message:${message}`,
    });
    return message;
  }
};

export default errorHandler;
