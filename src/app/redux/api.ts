import { Axios } from '../utils';

export const getRequest = async (url: string) => {
  const { data }: any = await Axios.get(url);
  return data;
};

export const postRequest = async (url: string, datas: any) => {
  const { data }: any = await Axios.post(url, datas);
  return data;
};

export const putRequest = async (url: string, datas: any) => {
  const { data }: any = await Axios.put(url, datas);
  return data;
};

export const deleteRequest = async (url: string) => {
  const { data }: any = await Axios.delete(url);
  return data;
};

export const patchRequest = async (url: string, datas: any) => {
  const { data }: any = await Axios.patch(url, datas);
  return data;
};

export const returnOBject = async (value: any) => value;
