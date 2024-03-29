import { useMutation, useQueryClient } from '@tanstack/react-query';

// Services
import {
  MainHttpService,
  addMoneyToUser,
  recentActivitiesHttpService,
  sendMoneyToUser,
} from '@/lib/services';

// Types
import {
  EActivity,
  TActivitiesRequest,
  TAddMoney,
  TSendMoney,
} from '@/lib/interfaces';

// Constants
import { END_POINTS } from '@/lib/constants';
import { authStore } from '../stores';

export const useMoney = () => {
  const { user } = authStore();
  const queryClient = useQueryClient();

  const { mutate: addMoneyToUserWallet } = useMutation({
    mutationFn: (userData: TAddMoney) => addMoneyToUser(userData),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [END_POINTS.MY_WALLET],
      });
      queryClient.invalidateQueries({
        queryKey: [END_POINTS.TRANSACTIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [END_POINTS.NOTIFICATION],
      });
    },
    onSuccess: async () => {
      try {
        const { data } = await MainHttpService.axiosClient.get('/');
        const isTrackLog = data ? true : false;

        if (isTrackLog && user) {
          await recentActivitiesHttpService.post<TActivitiesRequest>(
            END_POINTS.RECENT_ACTIVITIES,
            {
              userId: user.id,
              actionName: EActivity.ADD_MONEY,
            },
          );
        }
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    },
  });

  const { mutate: sendMoneyToUserWallet } = useMutation({
    mutationFn: (userData: TSendMoney) => sendMoneyToUser(userData),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [END_POINTS.MY_WALLET],
      });
      queryClient.invalidateQueries({
        queryKey: [END_POINTS.TRANSACTIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [END_POINTS.NOTIFICATION],
      });
    },
    onSuccess: async () => {
      try {
        const { data } = await MainHttpService.axiosClient.get('/');
        const isTrackLog = data ? true : false;

        if (isTrackLog && user) {
          await recentActivitiesHttpService.post<TActivitiesRequest>(
            END_POINTS.RECENT_ACTIVITIES,
            {
              userId: user.id,
              actionName: EActivity.SEND_MONEY,
            },
          );
        }
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    },
  });

  return {
    addMoneyToUserWallet,
    sendMoneyToUserWallet,
  };
};
