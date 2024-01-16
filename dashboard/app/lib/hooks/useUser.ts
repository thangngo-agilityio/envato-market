import { useMutation } from '@tanstack/react-query';

// Interfaces
import { TPassword, TUserDetail } from '@/lib/interfaces';

// Services
import { UsersHttpService } from '@/lib/services';

// Constants
import { END_POINTS } from '@/lib/constants';

export const useUpdateUser = () => {
  const { error, ...rest } = useMutation({
    mutationFn: async (user: TUserDetail) =>
      await UsersHttpService.put<TUserDetail>(
        `${END_POINTS.USERS}/${user.id}`,
        user,
      ),
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
