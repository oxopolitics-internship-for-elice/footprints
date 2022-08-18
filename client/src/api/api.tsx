import axios, { AxiosResponse } from 'axios';

const get = async (url: string): Promise<AxiosResponse> => {
  const response = await axios.get(url);
  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
  return response;
};

export { get };
