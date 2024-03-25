import axios, { AxiosInstance } from 'axios';

// Constants
import { END_POINTS } from '@/lib/constants';

// Types
import { IAxiosConfig, TProduct } from '@/lib/interfaces';

export const recentActivitiesHttpService: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ACTIVITIES,
});

export const getRecentActivities = async (
  searchParam?: string,
  config?: IAxiosConfig,
): Promise<TProduct[]> =>
  (
    await recentActivitiesHttpService.get(
      `${END_POINTS.RECENT_ACTIVITIES}/${searchParam || ''}`,
      config,
    )
  ).data.result;
