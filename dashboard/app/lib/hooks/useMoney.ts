import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';

// Services
import {
  TMoneyResponse,
  addMoneyToUser,
  sendMoneyToUser,
} from '@/lib/services';

// Types
import { TAddMoney, TSendMoney } from '@/lib/interfaces';

// Constants
import {
  END_POINTS,
  ERROR_MESSAGES,
  STATUS,
  SUCCESS_MESSAGES,
} from '@/lib/constants';

// Utils
import { customToast, getErrorMessageFromAxiosError } from '@/lib/utils';

// Stores
import { authStore } from '@/lib/stores';

export const useMoney = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { user, setUser } = authStore((state) => ({
    user: state.user,
    setUser: state.updateStore,
  }));

  const handleTransferMoneySuccess = (defaultSuccess: {
    title: string;
    description: string;
  }) => {
    toast(
      customToast(
        defaultSuccess.title,
        defaultSuccess.description,
        STATUS.SUCCESS,
      ),
    );
    if (user?.bonusTimes) {
      setUser({
        user: {
          ...user,
          bonusTimes: --user.bonusTimes,
        },
      });
    }
  };

  const handleTransferMoneyError = (
    error: Error,
    defaultError: {
      title: string;
      description: string;
    },
  ) => {
    const responseErrorMessage = getErrorMessageFromAxiosError(
      error as AxiosError<TMoneyResponse>,
      defaultError.description,
    );

    toast(customToast(defaultError.title, responseErrorMessage, STATUS.ERROR));
  };

  const { mutate: addMoneyToUserWallet } = useMutation({
    mutationFn: (userData: TAddMoney) => addMoneyToUser(userData),
    onSuccess: () => handleTransferMoneySuccess(SUCCESS_MESSAGES.ADD_MONEY),
    onError: (error) =>
      handleTransferMoneyError(error, ERROR_MESSAGES.ADD_MONEY),
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
  });

  const { mutate: sendMoneyToUserWallet } = useMutation({
    mutationFn: (userData: TSendMoney) => sendMoneyToUser(userData),
    onSuccess: () => handleTransferMoneySuccess(SUCCESS_MESSAGES.SEND_MONEY),
    onError: (error) =>
      handleTransferMoneyError(error, ERROR_MESSAGES.SEND_MONEY),
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
  });

  return {
    addMoneyToUserWallet,
    sendMoneyToUserWallet,
  };
};
