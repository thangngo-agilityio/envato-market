import axios, { AxiosInstance } from 'axios';

// Constants
import { END_POINTS } from '@/lib/constants';

// Types
import { IAxiosConfig, TAddMoney, TSendMoney } from '@/lib/interfaces';

export const moneyHttpRequest: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

export type TMoneyResponse = {
  message: string;
};

export const addMoneyToUser = async (
  data?: TAddMoney | undefined,
  config?: IAxiosConfig,
): Promise<TMoneyResponse> =>
  (
    await moneyHttpRequest.put<TMoneyResponse>(
      `${END_POINTS.ADD_MONEY}`,
      data,
      config,
    )
  ).data;

export const sendMoneyToUser = async (
  data?: TSendMoney | undefined,
  config?: IAxiosConfig,
): Promise<TMoneyResponse> =>
  (
    await moneyHttpRequest.put<TMoneyResponse>(
      `${END_POINTS.SEND_MONEY}`,
      data,
      config,
    )
  ).data;
