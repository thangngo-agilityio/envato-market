import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

// Interfaces
import { IIssues, TPassword, TUserDetail } from '@/lib/interfaces';
import { TSearchTransaction } from '.';

// Services
import {
  UsersHttpService,
  getAllUserDetailsExceptWithId,
  getSupports,
  userHttpRequest,
} from '@/lib/services';

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

export const useGetUserDetails = (
  id: string,
  queryParam?: TSearchTransaction,
) => {
  const queryClient = useQueryClient();

  const { name: searchName }: TSearchTransaction = Object.assign(
    {
      name: '',
    },
    queryParam,
  );

  const { data: listUserDetail, ...query } = useQuery({
    queryKey: [END_POINTS.USERS, searchName],
    queryFn: () => getAllUserDetailsExceptWithId(id, ''),
  });

  const isNameMatchWith = (target: string): boolean =>
    (target || '').trim().toLowerCase().includes(searchName);

  const filterDataUser = listUserDetail?.filter(({ firstName, lastName }) => {
    const isMatchWithName: boolean = isNameMatchWith(
      `${firstName} ${lastName}`,
    );

    return isMatchWithName;
  });

  const { mutate: managementUser } = useMutation({
    mutationFn: async ({
      urlEndpoint = '',
      ...user
    }: Partial<
      TUserDetail & { memberId: string; userId: string; urlEndpoint: string }
    >) => await userHttpRequest.put<TUserDetail>(urlEndpoint, user),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [END_POINTS.LOCK],
      });
      queryClient.invalidateQueries({
        queryKey: [END_POINTS.USERS, searchName],
      });
      queryClient.invalidateQueries({
        queryKey: [END_POINTS.SIGN_IN],
      });
    },
  });

  return {
    ...query,
    filterDataUser,
    managementUser,
  };
};
