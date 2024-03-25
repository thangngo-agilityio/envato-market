import { useQuery } from '@tanstack/react-query';
import { END_POINTS } from '@/lib/constants';
import { getRecentActivities } from '@/lib/services';

export type TSearchAction = {
  name: string;
};

export const useRecentActivities = (queryParam?: TSearchAction) => {
  const { name: searchName }: TSearchAction = Object.assign(
    {
      name: '',
    },
    queryParam,
  );

  const { data: recentActivities = [], ...query } = useQuery({
    queryKey: [END_POINTS.RECENT_ACTIVITIES, searchName],
    queryFn: ({ signal }) => getRecentActivities('', { signal }),
  });

  return {
    ...query,
    recentActivities,
  };
};
