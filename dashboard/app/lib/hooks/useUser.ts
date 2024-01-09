import { useMutation } from '@tanstack/react-query';

// Interfaces
import { TUserDetail } from '@/lib/interfaces';

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
    error: error?.message || '',
  };
};
