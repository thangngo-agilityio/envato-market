'use client';

import {
  END_POINTS,
  ERROR_MESSAGES,
  SHOW_TIME,
  STATUS,
  SUCCESS_MESSAGES,
} from '@/lib/constants';
import {
  useAuth,
  useNotification,
  usePinCode,
  useTransactions,
  useWallet,
} from '@/lib/hooks';
import { TPinCodeForm } from '@/lib/interfaces';
import { TAuthStoreData, authStore } from '@/lib/stores';
import { customToast } from '@/lib/utils';
import { Modal, PinCode } from '@/ui/components';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { getMessaging, onMessage } from 'firebase/messaging';
import { useCallback, useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const CheckPinCodeProvider = ({ children }: { children: React.ReactNode }) => {
  const user = authStore((state): TAuthStoreData['user'] => state.user);

  //TODO: re-check later
  useNotification(user?.id);
  useWallet(user?.id);
  useTransactions();

  const {
    isOpen: isPinCodeModalOpen,
    onClose: onClosePinCodeModal,
    onOpen: onOpenPinCodeModal,
  } = useDisclosure();

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<TPinCodeForm>({
    defaultValues: {
      pinCode: '',
    },
  });

  const { setUser } = useAuth();

  const toast = useToast();

  const { handleSetPinCode } = usePinCode();

  const onSubmitPinCode: SubmitHandler<TPinCodeForm> = useCallback(
    (data) => {
      if (user) {
        data.userId = user.id;

        try {
          handleSetPinCode(data);

          setUser({ user: { ...user, pinCode: data.pinCode } });

          onClosePinCodeModal();

          toast(
            customToast(
              SUCCESS_MESSAGES.SET_PIN_CODE.title,
              SUCCESS_MESSAGES.SET_PIN_CODE.description,
              STATUS.SUCCESS,
            ),
          );
        } catch (error) {
          toast(
            customToast(
              ERROR_MESSAGES.SET_PIN_CODE.title,
              ERROR_MESSAGES.SET_PIN_CODE.description,
              STATUS.ERROR,
            ),
          );
        }
      }
    },
    [handleSetPinCode, onClosePinCodeModal, setUser, toast, user],
  );

  useEffect(() => {
    if (!user?.pinCode) {
      onOpenPinCodeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pinCodeModalBody = useMemo(
    () => (
      <PinCode
        control={control}
        isDisabled={!isValid || isSubmitting}
        onSubmit={handleSubmit(onSubmitPinCode)}
        onClose={onClosePinCodeModal}
      />
    ),
    [
      control,
      handleSubmit,
      isSubmitting,
      isValid,
      onClosePinCodeModal,
      onSubmitPinCode,
    ],
  );

  const queryClient = useQueryClient();

  const messaging = typeof window !== 'undefined' ? getMessaging() : null;

  messaging &&
    onMessage(messaging, async (payload) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [END_POINTS.MY_WALLET],
        }),
        queryClient.invalidateQueries({
          queryKey: [END_POINTS.TRANSACTIONS],
        }),
        queryClient.invalidateQueries({
          queryKey: [END_POINTS.NOTIFICATION],
        }),
      ]).finally(() => {
        toast({
          title: payload?.notification?.title,
          description: payload?.notification?.body,
          status: 'success',
          duration: SHOW_TIME,
          isClosable: true,
          position: 'top-right',
        });
      });
    });

  return (
    <>
      {children}
      {isPinCodeModalOpen && (
        <Modal
          title="Please set the PIN code to your account"
          isOpen={isPinCodeModalOpen}
          onClose={onClosePinCodeModal}
          body={pinCodeModalBody}
        />
      )}
    </>
  );
};

export default CheckPinCodeProvider;
