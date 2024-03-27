import { useMutation, useQueryClient } from '@tanstack/react-query';

// Services
import {
  addMoneyToUser,
  moneyHttpRequest,
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
      moneyHttpRequest.interceptors.request.use(async (request) => {
        await recentActivitiesHttpService.post<TActivitiesRequest>(
          END_POINTS.RECENT_ACTIVITIES,
          {
            userId: user?.id,
            actionName: EActivity.ADD_MONEY,
          },
        );
        return request;
      });
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
  });

  const { mutate: sendMoneyToUserWallet } = useMutation({
    mutationFn: (userData: TSendMoney) => sendMoneyToUser(userData),
    onSettled: () => {
      moneyHttpRequest.interceptors.request.use(async (request) => {
        await recentActivitiesHttpService.post<TActivitiesRequest>(
          END_POINTS.RECENT_ACTIVITIES,
          {
            userId: user?.id,
            actionName: EActivity.SEND_MONEY,
          },
        );
        return request;
      });
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
  });

  return {
    addMoneyToUserWallet,
    sendMoneyToUserWallet,
  };
};
