// Types
import axios, { AxiosInstance } from 'axios';
import { IIssues } from '../interfaces';

export const supportHttpService: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

export type TIssueResponse = {
  result: Array<IIssues>;
  totalPage: number;
};

export const getSupports = async (
  url: string,
  pageParam: number,
): Promise<{
  data: TIssueResponse;
  pageParams: number;
}> => {
  const response = (
    await supportHttpService.get<TIssueResponse>(`${url}/${pageParam}`)
  ).data;

  return { data: response, pageParams: pageParam + 1 };
};
