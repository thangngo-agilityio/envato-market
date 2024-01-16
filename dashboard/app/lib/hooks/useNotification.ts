import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Constants
import { END_POINTS } from '@/lib/constants';

// Interfaces
import { TNotification } from '@/lib/interfaces';

// Services
import { getNotifications, notificationHttpRequest } from '@/lib/services';

export const useNotification = (userId?: string) => {
  const queryClient = useQueryClient();

  const { data = [], ...query } = useQuery({
    queryKey: [END_POINTS.NOTIFICATION],
    queryFn: () => getNotifications(userId),
  });

  const { quantity, hasNewNotification } = data.reduce(
    (result, notification) => {
      if (!notification?.isMarkAsRead) {
        result.quantity += 1;
        result.hasNewNotification = true;
      }
      return result;
    },
    { quantity: 0, hasNewNotification: false },
  );

  const { mutate: deleteNotification } = useMutation({
    mutationFn: async (
      payload: Partial<
        TNotification & { userId: string; notificationId: string }
      >,
    ) => {
      await notificationHttpRequest.delete(END_POINTS.NOTIFICATION, {
        data: payload,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [END_POINTS.NOTIFICATION] });
    },
  });

  const { mutate: updateNotification } = useMutation({
    mutationFn: async (
      transaction: Partial<
        TNotification & { userId: string; notificationId: string }
      >,
    ) =>
      await notificationHttpRequest.put<TNotification>(
        END_POINTS.NOTIFICATION,
        transaction,
      ),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [END_POINTS.NOTIFICATION],
      });
    },
  });

  return {
    ...query,
    data,
    quantity,
    hasNewNotification,
    deleteNotification,
    updateNotification,
  };
};
