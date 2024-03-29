import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

// Interfaces
import {
  EActivity,
  IIssues,
  TActivitiesRequest,
  TPassword,
  TUserDetail,
} from '@/lib/interfaces';
import { TSearchTransaction } from '.';

// Services
import {
  MainHttpService,
  getAllUserDetailsExceptWithId,
  getSupports,
  recentActivitiesHttpService,
  userHttpRequest,
} from '@/lib/services';

// Constants
import { END_POINTS } from '@/lib/constants';

// Stores
import { authStore } from '../stores';

// Utils
import { formatUppercaseFirstLetter } from '../utils';

export const useUpdateUser = () => {
  const { user } = authStore();
  const { error, ...rest } = useMutation({
    mutationFn: async (user: TUserDetail) =>
      await MainHttpService.put<TUserDetail>(END_POINTS.USERS, user),
    onSuccess: async () => {
      try {
        const { data } = await MainHttpService.axiosClient.get(
          END_POINTS.SETTINGS,
        );
        const isTrackLog = data ? true : false;

        if (isTrackLog && user) {
          await recentActivitiesHttpService.post<TActivitiesRequest>(
            END_POINTS.RECENT_ACTIVITIES,
            {
              userId: user.id,
              actionName: EActivity.SAVE_PROFILE,
            },
          );
        }
      } catch (error) {
        const { response } = error as AxiosError<string>;

        throw new Error(formatUppercaseFirstLetter(response?.data));
      }
    },
  });

  return {
    ...rest,
    error: error?.message ?? '',
  };
};

export const useUpdatePassword = () => {
  const { user } = authStore();
  const { error, ...rest } = useMutation({
    mutationFn: async (passwordData: TPassword) => {
      const { oldPassword, newPassword, memberId } = passwordData;

      await MainHttpService.put<TPassword>(`${END_POINTS.UPDATE_PASSWORD}`, {
        oldPassword,
        newPassword,
        memberId,
      });
    },
    onSuccess: async () => {
      try {
        const { data } = await MainHttpService.axiosClient.get(
          END_POINTS.SETTINGS,
        );
        console.log('data', data);
        const isTrackLog = data ? true : false;

        if (isTrackLog && user) {
          await recentActivitiesHttpService.post<TActivitiesRequest>(
            END_POINTS.RECENT_ACTIVITIES,
            {
              userId: user.id,
              actionName: EActivity.SAVE_PASSWORD,
            },
          );
        }
      } catch (error) {
        const { response } = error as AxiosError<string>;

        throw new Error(formatUppercaseFirstLetter(response?.data));
      }
    },
  });

  return {
    ...rest,
    error: error?.message ?? '',
  };
};

export const useGetListIssues = () => {
  const { data, ...rest } = useInfiniteQuery({
    queryKey: [END_POINTS.SUPPORT],
    queryFn: ({ pageParam = 1 }) => getSupports(END_POINTS.SUPPORT, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.pageParams > lastPage.data.totalPage) return undefined;

      return lastPage.pageParams;
    },
    initialPageParam: 1,
  });

  const issuesData: IIssues[] =
    data?.pages.flatMap((page) => page.data.result) || [];
  return {
    data: issuesData,
    ...rest,
  };
};

export const useCreateIssues = () => {
  const queryClient = useQueryClient();
  const { user } = authStore();
  const { error, ...rest } = useMutation({
    mutationFn: async (
      supportList: Partial<
        TUserDetail & {
          userId: string;
          phone: string;
        }
      >,
    ) =>
      await MainHttpService.post<TUserDetail>(
        `${END_POINTS.SUPPORT}`,
        supportList,
        {},
      ),
    onSettled: async () => {
      try {
        const { data } = await MainHttpService.axiosClient.get(
          END_POINTS.SUPPORT,
        );
        console.log('data', data);
        const isTrackLog = data ? true : false;

        if (isTrackLog && user) {
          await recentActivitiesHttpService.post<TActivitiesRequest>(
            END_POINTS.RECENT_ACTIVITIES,
            {
              userId: user.id,
              actionName: EActivity.CREATE_ISSUES,
            },
          );
        }
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
      queryClient.invalidateQueries({ queryKey: [END_POINTS.SUPPORT] });
    },
  });

  return {
    ...rest,
    error: error?.message || '',
  };
};

export const useGetUserDetails = (
  id: string,
  queryParam?: TSearchTransaction,
) => {
  const { name: searchName }: TSearchTransaction = Object.assign(
    {
      name: '',
    },
    queryParam,
  );

  const { data: listUserDetail, ...query } = useQuery({
    queryKey: [END_POINTS.USERS, queryParam?.name],
    queryFn: () => getAllUserDetailsExceptWithId(id, ''),
  });

  const isNameMatchWith = (target: string): boolean =>
    (target || '').trim().toLowerCase().includes(searchName);

  const filterDataUser = listUserDetail?.filter(({ firstName, lastName }) =>
    isNameMatchWith(`${firstName} ${lastName}`),
  );

  return {
    ...query,
    filterDataUser,
  };
};

export const useManagementUser = (querySearch = '') => {
  const queryClient = useQueryClient();

  const {
    mutate: managementUser,
    isPending: isSendRequestUser,
    ...query
  } = useMutation({
    mutationFn: async ({
      urlEndpoint = '',
      ...user
    }: Partial<
      TUserDetail & { memberId: string; userId: string; urlEndpoint: string }
    >) => await userHttpRequest.put<TUserDetail>(urlEndpoint, user),
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        [END_POINTS.USERS, querySearch],
        (oldData: TUserDetail[]) => {
          const dataUpdated = oldData.map((item) =>
            item._id === variables.memberId
              ? { ...item, isBlock: !item.isBlock }
              : item,
          );
          return dataUpdated;
        },
      );
    },
  });

  return {
    ...query,
    isSendRequestUser,
    managementUser,
  };
};
