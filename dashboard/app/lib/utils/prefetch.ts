import { QueryClient } from '@tanstack/react-query';
import { getEmployees, getStatistical } from '../services';
import { END_POINTS } from '../constants';

export const prefetchStatistical = async <T>(
  endPoint: string,
  queryClient: QueryClient,
) => {
  await queryClient.prefetchQuery({
    queryKey: [endPoint],
    queryFn: () => getStatistical<T>(endPoint),
  });
};

export const prefetchUsers = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery({
    queryKey: [END_POINTS.EMPLOYEES, ''],
    queryFn: () => getEmployees(),
  });
};
