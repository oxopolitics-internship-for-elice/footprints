import axios, { AxiosResponse } from 'axios';

const put = async (url: string, body: object[]): Promise<AxiosResponse> => {
  const response = await axios.put(url, body);
  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
  return response;
};

export default put;
