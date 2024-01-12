import axios, { AxiosInstance } from 'axios';

// Constants
import { END_POINTS } from '@/lib/constants';

// Types
import { IAxiosConfig, TEmployee } from '@/lib/interfaces';

export const employeeHttpRequest: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_USER,
});

export const getEmployees = async (
  query = '',
  config?: IAxiosConfig,
): Promise<TEmployee[]> =>
  (
    await employeeHttpRequest.get(
      `${END_POINTS.EMPLOYEES}?jobTitle=${query}`,
      config,
    )
  ).data;
