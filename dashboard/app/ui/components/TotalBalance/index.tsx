'use client';

import { FormEvent, memo, useCallback, useMemo } from 'react';
import { Box, Button, useToast } from '@chakra-ui/react';
import { SubmitHandler } from 'react-hook-form';

// Stores
import { TAuthStoreData, authStore } from '@/lib/stores';

// Hooks
import { useAuth, useForm, useMoney, usePinCode } from '@/lib/hooks';

// Components
import { AddMoneyInput } from './AddMoneyInput';
import { Modal, PinCode } from '..';

// Types
import { TPinCodeForm } from '@/lib/interfaces';

// Constants
import {
  DEFAULT_DISCOUNT_PERCENTAGE,
  ERROR_MESSAGES,
  STATUS,
  SUCCESS_MESSAGES,
} from '@/lib/constants';
import { customToast } from '@/lib/utils';

export type TAddMoneyForm = {
  userId: string;
  amount: string;
};

const TotalBalanceComponent = (): JSX.Element => {
  const user = authStore((state): TAuthStoreData['user'] => state.user);

  const { setUser } = useAuth();

  const {
    handleSetPinCode,
    handleConfirmPinCode,
    isConfirmPinCodeModalOpen,
    isSetPinCodeModalOpen,
    onCloseConfirmPinCodeModal,
    onCloseSetPinCodeModal,
    onOpenConfirmPinCodeModal,
    onOpenSetPinCodeModal,
  } = usePinCode();

  const {
    control: setPinCodeControl,
    handleSubmit: handleSubmitSetPinCode,
    formState: { isValid: isSetValid, isSubmitting: isSetSubmitting },
    reset: resetSetPinCodeForm,
  } = useForm<TPinCodeForm>({});

  const {
    control: confirmPinCodeControl,
    handleSubmit: handleSubmitConfirmPinCode,
    formState: { isValid: isConfirmValid, isSubmitting: isConfirmSubmitting },
    reset: resetConfirmPinCodeForm,
  } = useForm<TPinCodeForm>({
    defaultValues: {
      pinCode: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const {
    control: addMoneyControl,
    handleSubmit: handleSubmitAddMoney,
    formState: { isValid: isAddMoneyValid, isSubmitting: isAddMoneySubmitting },
    reset: resetAddMoneyForm,
  } = useForm<TAddMoneyForm>({
    defaultValues: {
      userId: user?.id,
      amount: '',
    },
  });

  const toast = useToast();
  const { addMoneyToUserWallet } = useMoney();

  const bonusTimes = authStore((state): number => state.user?.bonusTimes ?? 0);

  const onSubmitAddMoney: SubmitHandler<TAddMoneyForm> = useCallback(
    (data) => {
      const addMoneyAmount: number = Number(data.amount);

      const dataToSubmit = {
        ...data,
        amount:
          addMoneyAmount +
          (bonusTimes ? addMoneyAmount * DEFAULT_DISCOUNT_PERCENTAGE : 0),
      };

      addMoneyToUserWallet(dataToSubmit);
    },
    [addMoneyToUserWallet],
  );

  const handleOnSubmitAddMoney = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.pinCode) {
      onOpenSetPinCodeModal();
    } else {
      onOpenConfirmPinCodeModal();
    }
  };

  const onSubmitPinCode: SubmitHandler<TPinCodeForm> = useCallback(
    async (data) => {
      if (user) {
        data.userId = user.id;
        if (!user?.pinCode) {
          try {
            await handleSetPinCode(data);

            setUser({ user: { ...user, pinCode: data.pinCode } });

            onCloseSetPinCodeModal();

            resetSetPinCodeForm();

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
        } else {
          try {
            await handleConfirmPinCode(data);
            onCloseConfirmPinCodeModal();
            resetConfirmPinCodeForm({
              pinCode: '',
            });

            await handleSubmitAddMoney(onSubmitAddMoney)();
            resetAddMoneyForm();

            toast(
              customToast(
                SUCCESS_MESSAGES.CONFIRM_PIN_CODE.title,
                SUCCESS_MESSAGES.CONFIRM_PIN_CODE.description,
                STATUS.SUCCESS,
              ),
            );
          } catch (error) {
            toast(
              customToast(
                ERROR_MESSAGES.CONFIRM_PIN_CODE.title,
                ERROR_MESSAGES.CONFIRM_PIN_CODE.description,
                STATUS.ERROR,
              ),
            );
            resetConfirmPinCodeForm();
          }
        }
      }
    },
    [
      handleConfirmPinCode,
      handleSetPinCode,
      handleSubmitAddMoney,
      onCloseConfirmPinCodeModal,
      onCloseSetPinCodeModal,
      onSubmitAddMoney,
      resetAddMoneyForm,
      resetConfirmPinCodeForm,
      resetSetPinCodeForm,
      setUser,
      toast,
      user,
    ],
  );

  const handleCloseSetPinCodeModal = useCallback(() => {
    onCloseSetPinCodeModal();
    resetSetPinCodeForm();
  }, [onCloseSetPinCodeModal, resetSetPinCodeForm]);

  const handleCloseConfirmPinCodeModal = useCallback(() => {
    onCloseConfirmPinCodeModal();
    resetConfirmPinCodeForm();
  }, [onCloseConfirmPinCodeModal, resetConfirmPinCodeForm]);

  const pinCodeModalBody = useMemo(() => {
    if (!user?.pinCode)
      return (
        <PinCode
          control={setPinCodeControl}
          isDisabled={!isSetValid || isSetSubmitting}
          onSubmit={handleSubmitSetPinCode(onSubmitPinCode)}
          onClose={handleCloseSetPinCodeModal}
        />
      );
    return (
      <PinCode
        control={confirmPinCodeControl}
        isDisabled={!isConfirmValid || isConfirmSubmitting}
        onSubmit={handleSubmitConfirmPinCode(onSubmitPinCode)}
        onClose={handleCloseConfirmPinCodeModal}
      />
    );
  }, [
    confirmPinCodeControl,
    handleCloseConfirmPinCodeModal,
    handleCloseSetPinCodeModal,
    handleSubmitConfirmPinCode,
    handleSubmitSetPinCode,
    isConfirmSubmitting,
    isConfirmValid,
    isSetSubmitting,
    isSetValid,
    onSubmitPinCode,
    setPinCodeControl,
    user?.pinCode,
  ]);

  return (
    <>
      <Box
        w="full"
        bg="background.body.quaternary"
        px={8}
        py={7}
        borderRadius="lg"
      >
        <form onSubmit={handleOnSubmitAddMoney}>
          <AddMoneyInput control={addMoneyControl} />
          <Button
            aria-label="btn-add-money"
            mt={14}
            colorScheme="primary"
            fontWeight="bold"
            type="submit"
            isDisabled={!isAddMoneyValid || isAddMoneySubmitting}
          >
            Add Money
          </Button>
        </form>
      </Box>

      {/*Set PIN code Modal */}
      {isSetPinCodeModalOpen && (
        <Modal
          title="Please set the PIN code to your account"
          isOpen={isSetPinCodeModalOpen}
          onClose={handleCloseSetPinCodeModal}
          body={pinCodeModalBody}
        />
      )}

      {/*Confirm PIN code Modal */}
      {isConfirmPinCodeModalOpen && (
        <Modal
          title="Please enter your PIN code"
          isOpen={isConfirmPinCodeModalOpen}
          onClose={handleCloseConfirmPinCodeModal}
          body={pinCodeModalBody}
        />
      )}
    </>
  );
};

const TotalBalance = memo(TotalBalanceComponent);

export default TotalBalance;
