import axios, { AxiosInstance } from 'axios';

// Constants
import { END_POINTS } from '@app/constants';

// Types
import { IAxiosConfig, TTransaction } from '@app/interfaces';

export const transactionHttpService: AxiosInstance = axios.create({
  baseURL: process.env.VITE_API_TRANSACTION,
});

export const getTransactions = async (
  searchParam?: string,
  config?: IAxiosConfig,
): Promise<TTransaction[]> =>
  (
    await transactionHttpService.get(
      `${END_POINTS.TRANSACTIONS}${searchParam || ''}`,
      config,
    )
  ).data;
