import { useCallback, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

// Constants
import { END_POINTS, TIME_FORMAT } from '@/lib/constants';

// Services
import { getRecentActivities } from '@/lib/services';

// Interface
import { TRecentActivities } from '@/lib/interfaces';

// Utils
import { handleSort } from '@/lib/utils';

export type TAction = {
  name: string;
  userId?: string;
  queryParam?: string;
};

type TSortType = 'desc' | 'asc';
export type TActivitiesSortField = 'actionName' | 'email' | 'date';
type TSort = {
  field: TActivitiesSortField | '';
  type: TSortType;
};
export type TActivitiesSortHandler = (field: TActivitiesSortField) => void;

export const useRecentActivities = ({ queryParam, userId }: TAction) => {
  const sortType: Record<TSortType, TSortType> = useMemo(
    () => ({
      desc: 'asc',
      asc: 'desc',
    }),
    [],
  );

  const [sortValue, setSortValue] = useState<TSort>({
    field: '',
    type: 'asc',
  });

  const { name: searchName }: TAction = Object.assign(
    {
      name: '',
    },
    queryParam,
  );

  const { data = [], ...query } = useQuery({
    queryKey: [END_POINTS.RECENT_ACTIVITIES, searchName],
    queryFn: ({ signal }) => getRecentActivities('', { signal }, userId),
  });

  // sort products
  const activitiesAfterSort: TRecentActivities[] = useMemo(() => {
    const tempProducts: TRecentActivities[] = [...data];
    const { field, type } = sortValue;

    if (!field) return data;

    tempProducts.sort(
      (
        {
          actionName: prevActivitiesName,
          email: prevEmail,
          createdAt: prevCreatedAt,
        }: TRecentActivities,
        {
          actionName: nextActivitiesName,
          email: nextEmail,
          createdAt: nextCreatedAt,
        }: TRecentActivities,
      ) => {
        const valueForField: Record<TActivitiesSortField, number> = {
          actionName: handleSort(
            type,
            prevActivitiesName ?? '',
            nextActivitiesName ?? '',
          ),
          email: handleSort(type, prevEmail ?? '', nextEmail ?? ''),
          date: handleSort(
            type,
            dayjs(prevCreatedAt).format(TIME_FORMAT) ?? '',
            dayjs(nextCreatedAt).format(TIME_FORMAT) ?? '',
          ),
        };

        return valueForField[field] ?? 0;
      },
    );

    return tempProducts;
  }, [data, sortValue]);

  /**
   * TODO: Since the API is imprecise we will use this method for now.
   * TODO: Will be removed in the future and will use queryKey for re-fetching
   */
  const activities: TRecentActivities[] = useMemo((): TRecentActivities[] => {
    const isNameMatchWith = (target: string): boolean =>
      (target || '').trim().toLowerCase().includes(searchName);

    return activitiesAfterSort.filter(({ actionName }: TRecentActivities) => {
      const isMatchWithName: boolean = isNameMatchWith(actionName);

      return isMatchWithName;
    });
  }, [activitiesAfterSort, searchName]);

  const sortBy: TActivitiesSortHandler = useCallback(
    (field: TActivitiesSortField) => {
      setSortValue((prev) => ({
        field: field,
        type: sortType[prev.type],
      }));
    },
    [sortType],
  );

  return {
    ...query,
    activities,
    data: activities,
    sortBy,
  };
};
