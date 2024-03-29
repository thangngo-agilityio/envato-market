import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

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

// Store
import { authStore } from '../stores';

// Utils
import { formatUppercaseFirstLetter } from '../utils';

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

        if (data && user) {
          await recentActivitiesHttpService.post<TActivitiesRequest>(
            END_POINTS.RECENT_ACTIVITIES,
            {
              userId: user.id,
              actionName: EActivity.ADD_MONEY,
            },
          );
        }
      } catch (error) {
        const { response } = error as AxiosError<string>;

        throw new Error(formatUppercaseFirstLetter(response?.data));
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

        if (data && user) {
          await recentActivitiesHttpService.post<TActivitiesRequest>(
            END_POINTS.RECENT_ACTIVITIES,
            {
              userId: user.id,
              actionName: EActivity.SEND_MONEY,
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
    addMoneyToUserWallet,
    sendMoneyToUserWallet,
  };
};
