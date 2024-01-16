import axios, { AxiosInstance } from 'axios';

// Constants
import { END_POINTS } from '@/lib/constants';

// Types
import { IAxiosConfig, TNotification } from '@/lib/interfaces';

export const notificationHttpRequest: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

export const getNotifications = async (
  userId?: string,
  config?: IAxiosConfig,
): Promise<TNotification[]> =>
  (
    await notificationHttpRequest.get(
      `${END_POINTS.NOTIFICATION}/${userId}`,
      config,
    )
  ).data;
