import axios, { AxiosInstance } from 'axios';

// Constants
import { END_POINTS } from '@/lib/constants';

// Types
import { IAxiosConfig, TWallet } from '@/lib/interfaces';

export const walletHttpRequest: AxiosInstance = axios.create({
  baseURL: process.env.VITE_API_ENDPOINT,
});

export const getUserWallet = async (
  userId?: string | undefined,
  config?: IAxiosConfig,
): Promise<TWallet> =>
  (await walletHttpRequest.get(`${END_POINTS.MY_WALLET}/${userId}`, config))
    .data;
