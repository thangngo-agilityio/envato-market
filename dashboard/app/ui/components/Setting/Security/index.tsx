'use client';

import { memo, useCallback, useState } from 'react';
import { Controller } from 'react-hook-form';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';

import {
  Box,
  VStack,
  useDisclosure,
  Text,
  Button,
  useToast,
  Heading,
  FormControl,
  FormLabel,
  Flex,
} from '@chakra-ui/react';

// Constants
import {
  AUTH_SCHEMA,
  ERROR_MESSAGES,
  IMAGES,
  STATUS,
  SUCCESS_MESSAGES,
} from '@/lib/constants';

// Hooks
import { useForm, useUpdatePassword } from '@/lib/hooks';

// Components
import { FallbackImage, InputField } from '@/ui/components';

// Stores
import { authStore } from '@/lib/stores';
import { TPassword } from '@/lib/interfaces';

// Utils
import { customToast, validatePassword } from '@/lib/utils';
import { QueryProvider } from '@/ui/providers';

const SecurityPage = () => {
  const { mutate: updatePassword } = useUpdatePassword();
  const user = authStore((state) => state.user);

  const toast = useToast();
  const {
    control,
    formState: {
      errors: { root },
    },
    watch,
    handleSubmit,
    reset,
    clearErrors,
  } = useForm<TPassword>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      memberId: user?.id,
    },
    mode: 'onBlur',
  });

  const handleClearErrorMessage = useCallback(
    (field: keyof TPassword, onChange: (value: string) => void) =>
      (data: string) => {
        clearErrors(field);
        onChange(data);
      },
    [clearErrors],
  );

  const handleUpdatePasswordSuccess = useCallback(() => {
    toast(
      customToast(
        SUCCESS_MESSAGES.UPDATE_SUCCESS.title,
        SUCCESS_MESSAGES.UPDATE_SUCCESS.description,
        STATUS.SUCCESS,
      ),
    );
    reset();
  }, [reset, toast]);

  const handleSubmitForm = useCallback(
    (updatedInfo: TPassword) => {
      updatePassword(updatedInfo, {
        onSuccess: handleUpdatePasswordSuccess,
        onError: () => {
          toast(
            customToast(
              ERROR_MESSAGES.OLD_PASSWORD_INCORRECT,
              ERROR_MESSAGES.UPDATE_FAIL.description,
              STATUS.ERROR,
            ),
          );
        },
      });
    },
    [handleUpdatePasswordSuccess, toast, updatePassword],
  );

  const { isOpen: isShowOldPassword, onToggle: onShowOldPassWord } =
    useDisclosure();
  const { isOpen: isShowNewPassword, onToggle: onShowNewPassWord } =
    useDisclosure();

  const renderPasswordIcon = useCallback(
    (isCorrect: boolean, callback: typeof onShowOldPassWord): JSX.Element => {
      const Icon = isCorrect ? ViewIcon : ViewOffIcon;

      return (
        <Icon
          color="gray.400"
          w="25px"
          h="25px"
          cursor="pointer"
          onClick={callback}
        />
      );
    },
    [],
  );

  const [isSubmit] = useState<boolean>(false);
  const isDisabledSubmitBtn: boolean =
    isSubmit || !Object.values(watch()).every((value) => value);

  return (
    <Flex w="full" gap={6} direction="row">
      <VStack
        mt={6}
        as="form"
        gap={6}
        onSubmit={handleSubmit(handleSubmitForm)}
        id="register-form"
        w="full"
        alignItems="flex-start"
      >
        <Box alignContent="start">
          <Heading
            as="h3"
            textTransform="capitalize"
            color="text.quinary"
            fontSize="2xl"
            fontWeight="bold"
            mb={3}
          >
            Password
          </Heading>
          <Text fontSize="14px" color="text.ternary">
            Change or view your password
          </Text>
        </Box>
        <Controller
          rules={AUTH_SCHEMA.PASSWORD}
          control={control}
          name="oldPassword"
          render={({ field: { onChange, ...rest }, fieldState: { error } }) => {
            const { message } = error ?? {};

            return (
              <FormControl>
                <FormLabel
                  color="secondary.700"
                  fontWeight="medium"
                  fontSize="sm"
                  mb={3}
                >
                  Old password
                </FormLabel>
                <InputField
                  type={isShowOldPassword ? 'text' : 'password'}
                  variant="authentication"
                  rightIcon={renderPasswordIcon(
                    isShowOldPassword,
                    onShowOldPassWord,
                  )}
                  {...rest}
                  isError={!!message}
                  errorMessages={message}
                  isDisabled={isSubmit}
                  onChange={handleClearErrorMessage('oldPassword', onChange)}
                  aria-label="oldPassword"
                  role="textbox"
                />
              </FormControl>
            );
          }}
        />

        <Controller
          control={control}
          rules={{ validate: validatePassword }}
          name="newPassword"
          render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
            <FormControl>
              <FormLabel
                color="secondary.700"
                fontWeight="medium"
                fontSize="sm"
                mb={3}
              >
                New password
              </FormLabel>
              <InputField
                type={isShowNewPassword ? 'text' : 'password'}
                variant="authentication"
                rightIcon={renderPasswordIcon(
                  isShowNewPassword,
                  onShowNewPassWord,
                )}
                {...rest}
                isError={!!error}
                errorMessages={error?.message}
                isDisabled={isSubmit}
                onChange={handleClearErrorMessage('newPassword', onChange)}
                role="textbox"
                aria-label="newPassword"
              />
            </FormControl>
          )}
        />

        <Box mb={7} alignSelf="end">
          <Text color="red" textAlign="center" py={2} h={10}>
            {root?.message}
          </Text>
          <Flex>
            <Button
              type="submit"
              aria-label="btn-save-change"
              px={4}
              textTransform="capitalize"
              form="register-form"
              isDisabled={isDisabledSubmitBtn}
              w="none"
            >
              Save Change
            </Button>
          </Flex>
        </Box>
      </VStack>
      <FallbackImage
        src={IMAGES.PASSWORD.url}
        alt={IMAGES.PASSWORD.alt}
        objectFit="contain"
        w={265}
        h={455}
        display={{ base: 'none', xl: 'block' }}
      />
    </Flex>
  );
};

const WrappedUserForm = () => (
  <QueryProvider>
    <SecurityPage />
  </QueryProvider>
);

const Security = memo(WrappedUserForm);
export default Security;
