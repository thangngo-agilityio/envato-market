import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

// Interfaces
import { IIssues, TPassword, TUserDetail } from '@/lib/interfaces';

// Services
import { UsersHttpService, getSupports } from '@/lib/services';

// Constants
import { END_POINTS } from '@/lib/constants';

export const useUpdateUser = () => {
  const { error, ...rest } = useMutation({
    mutationFn: async (user: TUserDetail) =>
      await UsersHttpService.put<TUserDetail>(END_POINTS.USERS, user),
  });

  return {
    ...rest,
    error: error?.message ?? '',
  };
};

export const useUpdatePassword = () => {
  const { error, ...rest } = useMutation({
    mutationFn: async (passwordData: TPassword) => {
      const { oldPassword, newPassword, memberId } = passwordData;

      await UsersHttpService.put<TPassword>(`${END_POINTS.UPDATE_PASSWORD}`, {
        oldPassword,
        newPassword,
        memberId,
      });
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
  const { error, ...rest } = useMutation({
    mutationFn: async (
      supportList: Partial<
        TUserDetail & {
          userId: string;
          phone: string;
        }
      >,
    ) =>
      await UsersHttpService.post<TUserDetail>(
        `${END_POINTS.SUPPORT}`,
        supportList,
        {},
      ),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [END_POINTS.SUPPORT] });
    },
  });

  return {
    ...rest,
    error: error?.message || '',
  };
};
