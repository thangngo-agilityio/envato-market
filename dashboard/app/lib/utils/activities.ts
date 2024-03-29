import { AxiosError } from 'axios';

// Store
import { authStore } from '../stores';

// Format
import { formatUppercaseFirstLetter } from '.';

// Interface
import { TActivitiesRequest } from '../interfaces';

// Service
import { MainHttpService, recentActivitiesHttpService } from '../services';

// Constants
import { END_POINTS } from '../constants';

export const handleActivities = async (url: string, actionName: string) => {
  const { user } = authStore();
  try {
    const { data } = await MainHttpService.axiosClient.get(url);

    if (data && user) {
      await recentActivitiesHttpService.post<TActivitiesRequest>(
        END_POINTS.RECENT_ACTIVITIES,
        {
          userId: user.id,
          actionName: actionName,
        },
      );
    }
  } catch (error) {
    const { response } = error as AxiosError<string>;

    throw new Error(formatUppercaseFirstLetter(response?.data));
  }
};
