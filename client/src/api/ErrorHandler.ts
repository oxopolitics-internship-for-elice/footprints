import axios, { AxiosError } from 'axios';

const errorHandler = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.log(`error message:${error.message}`);
    return error.message;
  } else {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);

    return message;
  }
};

export default errorHandler;
