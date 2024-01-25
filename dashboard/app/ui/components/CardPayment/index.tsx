'use client';

import { FormEvent, memo, useCallback, useMemo } from 'react';
import { Box, Heading, useDisclosure, useToast } from '@chakra-ui/react';
import { SubmitHandler } from 'react-hook-form';

// Hooks
import {
  useAuth,
  useForm,
  useGetUserDetails,
  useMoney,
  usePinCode,
  useWallet,
} from '@/lib/hooks';

// Components
import { Modal, PinCode } from '@/ui/components';

// Stores
import { authStore } from '@/lib/stores';

// Types
import { TPinCodeForm, TSendMoney } from '@/lib/interfaces';

// Constants
import { ERROR_MESSAGES, STATUS, SUCCESS_MESSAGES } from '@/lib/constants';

// Utils
import { customToast } from '@/lib/utils';
import CardBalance from './CardBalance';
import UserSelector from './UserSelector';
import EnterMoney from './EnterMoney';

export type TTransfer = {
  amount: string;
  memberId: string;
  userId: string;
};

const CardPaymentComponent = (): JSX.Element => {
  const user = authStore((state) => state.user);

  const { setUser } = useAuth();

  const toast = useToast();

  const {
    control,
    handleSubmit: handleSubmitSendMoney,
    formState: { isValid, isSubmitting },
    reset: resetSendMoneyForm,
  } = useForm<TTransfer>({
    defaultValues: {
      memberId: '',
      amount: '',
      userId: user?.id,
    },
  });

  const { currentWalletMoney } = useWallet(user?.id);
  console.log(currentWalletMoney);

  const { filterDataUser } = useGetUserDetails(user?.id || '');

  const {
    isOpen: isSetPinCodeModalOpen,
    onClose: onCloseSetPinCodeModal,
    onOpen: onOpenSetPinCodeModal,
  } = useDisclosure();

  const {
    isOpen: isConfirmPinCodeModalOpen,
    onClose: onCloseConfirmPinCodeModal,
    onOpen: onOpenConfirmPinCodeModal,
  } = useDisclosure();

  const { handleSetPinCode, handleConfirmPinCode } = usePinCode();

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

  const { sendMoneyToUserWallet } = useMoney();

  const getMemberId = useCallback(
    (email: string): string =>
      filterDataUser?.find(
        (user) =>
          user.email.trim().toLocaleLowerCase() === email.trim().toLowerCase(),
      )?._id || '',
    [filterDataUser],
  );

  const handleOnSubmitSendMoney = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.pinCode) {
      onOpenSetPinCodeModal();
    } else {
      onOpenConfirmPinCodeModal();
    }
  };

  const onSubmitSendMoney: SubmitHandler<TTransfer> = useCallback(
    (data) => {
      const submitData: TSendMoney = {
        ...data,
        memberId: getMemberId(data.memberId),
        amount: Number(data.amount),
      };

      sendMoneyToUserWallet(submitData);
      resetSendMoneyForm();
    },
    [getMemberId, resetSendMoneyForm, sendMoneyToUserWallet],
  );

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

            await handleSubmitSendMoney(onSubmitSendMoney)();
            resetSendMoneyForm();

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
      handleSubmitSendMoney,
      onCloseConfirmPinCodeModal,
      onCloseSetPinCodeModal,
      onSubmitSendMoney,
      resetConfirmPinCodeForm,
      resetSendMoneyForm,
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
        p={4}
        w="full"
        bg="background.body.quaternary"
        py={{ base: 4, md: 5 }}
        px={{ base: 4, md: 10 }}
        borderRadius="lg"
      >
        <Heading
          as="h3"
          fontWeight="bold"
          color="text.primary"
          fontSize="lg"
          mb={3}
          textTransform="capitalize"
        >
          my wallet
        </Heading>

        <CardBalance balance={currentWalletMoney?.balance || 0} />

        <Box as="form" mt={4} onSubmit={handleOnSubmitSendMoney}>
          <UserSelector control={control} listUser={filterDataUser} />
          <EnterMoney isDisabled={!isValid || isSubmitting} control={control} />
        </Box>
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

const CardPayment = memo(CardPaymentComponent);

export default CardPayment;
