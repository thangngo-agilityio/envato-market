'use client';

import { ChangeEvent, memo, useCallback, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import {
  Button,
  HStack,
  Text,
  VStack,
  Checkbox,
  useDisclosure,
  Box,
  Link as ChakraLink,
  Flex,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react';

import { Controller, SubmitHandler } from 'react-hook-form';

// Hooks
import { useForm, useAuth } from '@/lib/hooks';

// Constants
import { ROUTES, AUTH_SCHEMA, TITLES, ERROR_MESSAGES } from '@/lib/constants';

// Components
import { Divider, InputField } from '@/ui/components';

// Utils
import { app, requestForToken, validatePassword } from '@/lib/utils';

// Types
import { TUserDetail } from '@/lib/interfaces';
import { AuthFooter, AuthHeader } from '@/ui/layouts';
import { getMessaging } from 'firebase/messaging';

type TAuthForm = Omit<TUserDetail, 'id' | 'createdAt'> & {
  confirmPassword: string;
  isAcceptPrivacyPolicy: boolean;
  isRemember: false;
};

interface AuthFormProps {
  isRegister?: boolean;
}

const AuthFormComponent = ({
  isRegister = false,
}: AuthFormProps): JSX.Element => {
  const { signIn, signUp } = useAuth();
  const router = useRouter();

  // Control form
  const {
    control,
    formState: {
      errors: { root },
    },
    handleSubmit,
    watch,
    setError,
    clearErrors,
  } = useForm<TAuthForm>({
    defaultValues: {
      email: '',
      password: '',

      ...(!isRegister && {
        isRemember: false,
      }),
      ...(isRegister && {
        firstName: '',
        lastName: '',
        confirmPassword: '',
        isAcceptPrivacyPolicy: false,
      }),
    },
  });

  // Control show/hide password
  const { isOpen: isShowPassword, onToggle: onShowPassword } = useDisclosure();
  const { isOpen: isShowConfirmPassword, onToggle: onShowConfirmPassword } =
    useDisclosure();

  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const isFillAllFields: boolean = !Object.entries(watch()).every(
    ([key, value]) => {
      if (key === 'isRemember') return true;

      return value;
    },
  );

  const messaging = typeof window !== 'undefined' ? getMessaging(app) : null;

  const isDisabledSubmitBtn: boolean = isSubmit || isFillAllFields;

  const renderPasswordIcon = useCallback(
    (isCorrect: boolean, callback: typeof onShowPassword): JSX.Element => {
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

  const handleLogin: SubmitHandler<TAuthForm> = useCallback(
    async (data) => {
      setIsSubmit(true);
      try {
        const { email, password, isRemember } = data;
        const fcmToken =
          (messaging && (await requestForToken(messaging))) || '';

        await signIn({ email, password, fcmToken }, isRemember);

        router.push(ROUTES.ROOT);
      } catch (error) {
        const { message } = error as Error;

        setError('root', { type: 'custom', message });
      } finally {
        setIsSubmit(false);
      }
    },
    [router, setError, signIn],
  );

  const handleRegister: SubmitHandler<TAuthForm> = useCallback(
    async (data) => {
      setIsSubmit(true);
      const {
        isAcceptPrivacyPolicy: _isAcceptPrivacyPolicy,
        confirmPassword: _confirmPassword,
        ...fieldValues
      } = data;
      try {
        const fcmToken =
          (messaging && (await requestForToken(messaging))) || '';
        const { errors } = await signUp({ ...fieldValues, fcmToken });
        if (errors) {
          return Object.entries(errors).forEach(([key, value]) =>
            setError(key as keyof typeof data, {
              type: 'custom',
              message: value,
            }),
          );
        }
        router.push(ROUTES.ROOT);
      } catch (error) {
        setError('root', {
          type: 'custom',
          message: ERROR_MESSAGES.SOMETHING_ERROR,
        });
      } finally {
        setIsSubmit(false);
      }
    },
    [router, setError, signUp],
  );

  const handleClearErrorMessage = useCallback(
    (field: keyof TAuthForm, onChange: (value: string) => void) =>
      (data: string) => {
        clearErrors(field);
        onChange(data);
      },
    [clearErrors],
  );

  const handleClearRootError = useCallback(
    () => clearErrors('root'),
    [clearErrors],
  );

  return (
    <>
      <Box
        id={!isRegister ? 'login-form' : 'register-form'}
        as="form"
        onSubmit={handleSubmit(!isRegister ? handleLogin : handleRegister)}
        w={{
          base: '100%',
          sm: 425,
          md: 460,
        }}
        margin="auto"
        pt={24}
        pb={16}
        px={5}
        sx={{
          boxSizing: {
            base: 'border-box',
            md: 'unset',
          },
        }}
      >
        <AuthHeader title={isRegister ? TITLES.SIGN_UP : TITLES.SIGN_IN} />
        <Divider content={TITLES.AUTH_DiVIDER} />
        <VStack gap={6}>
          {isRegister && (
            <HStack
              gap={{
                base: 6,
                md: 10,
              }}
              w="100%"
              flexDirection={{
                base: 'column',
                md: 'row',
              }}
            >
              <Controller
                control={control}
                rules={AUTH_SCHEMA.FIRST_NAME}
                name="firstName"
                render={({ field, fieldState: { error } }) => (
                  <InputField
                    variant="authentication"
                    placeholder="First name"
                    {...field}
                    isError={!!error}
                    errorMessages={error?.message}
                    isDisabled={isSubmit}
                    onChange={handleClearErrorMessage(
                      'firstName',
                      field.onChange,
                    )}
                    aria-label="first-name"
                  />
                )}
              />
              <Controller
                control={control}
                rules={AUTH_SCHEMA.LAST_NAME}
                name="lastName"
                render={({ field, fieldState: { error } }) => (
                  <InputField
                    variant="authentication"
                    placeholder="Last name"
                    {...field}
                    isError={!!error}
                    errorMessages={error?.message}
                    isDisabled={isSubmit}
                    onChange={handleClearErrorMessage(
                      'lastName',
                      field.onChange,
                    )}
                    aria-label="last-name"
                  />
                )}
              />
            </HStack>
          )}
          <Controller
            rules={AUTH_SCHEMA.EMAIL}
            control={control}
            name="email"
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              const handleChange = (event: { target: { value: string } }) => {
                const value: string = event.target.value;
                const sanitizedValue = value.trim();

                onChange(sanitizedValue);
              };

              return (
                <>
                  <Input
                    variant="authentication"
                    placeholder="Username or email"
                    isDisabled={isSubmit}
                    value={value}
                    name="username"
                    onChange={handleChange}
                    onBlur={handleClearRootError}
                  />
                  {!!error?.message && (
                    <FormErrorMessage>{error?.message}</FormErrorMessage>
                  )}
                </>
              );
            }}
          />

          <Controller
            rules={{ validate: validatePassword }}
            control={control}
            name="password"
            render={({ field, fieldState: { error } }) => (
              <InputField
                type={isShowPassword ? 'text' : 'password'}
                variant="authentication"
                placeholder="Password"
                rightIcon={renderPasswordIcon(isShowPassword, onShowPassword)}
                isError={!!error?.message}
                errorMessages={error?.message}
                isDisabled={isSubmit}
                {...field}
                onBlur={handleClearRootError}
              />
            )}
          />

          {/* Helpers */}
          {!isRegister && (
            <HStack justifyContent="space-between" w="100%" mt={6}>
              <Controller
                control={control}
                name="isRemember"
                render={({ field: { value, onChange } }) => (
                  <Checkbox
                    aria-label="remember"
                    variant="round"
                    isChecked={value}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      onChange(e.target.checked)
                    }
                    position="relative"
                  >
                    <Text fontWeight="semibold">Remember me</Text>
                  </Checkbox>
                )}
              />
              <Text
                as={Link}
                href={`/${ROUTES.FORGOT_PASSWORD}`}
                aria-label="forgot password"
                color="primary.500"
                fontWeight="semibold"
                textTransform="capitalize"
                textDecoration="underline"
              >
                forgot password?
              </Text>
            </HStack>
          )}

          {isRegister && (
            <>
              <Controller
                control={control}
                rules={AUTH_SCHEMA.CONFIRM_PASSWORD}
                name="confirmPassword"
                render={({ field, fieldState: { error } }) => (
                  <InputField
                    type={isShowConfirmPassword ? 'text' : 'password'}
                    variant="authentication"
                    placeholder="Confirm password"
                    rightIcon={renderPasswordIcon(
                      isShowConfirmPassword,
                      onShowConfirmPassword,
                    )}
                    {...field}
                    isError={!!error}
                    errorMessages={error?.message}
                    isDisabled={isSubmit}
                    onChange={handleClearErrorMessage(
                      'confirmPassword',
                      field.onChange,
                    )}
                  />
                )}
              />
              <Flex gap={3}>
                <Controller
                  control={control}
                  rules={AUTH_SCHEMA.AGREE_POLICY}
                  name="isAcceptPrivacyPolicy"
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <Checkbox
                      size="md"
                      colorScheme="green"
                      isChecked={value}
                      isDisabled={isSubmit}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        onChange(e.target.checked)
                      }
                      {...(error && {
                        sx: {
                          '> span': {
                            borderColor: 'danger.400',
                          },
                        },
                      })}
                    >
                      <Text color="text.secondary" fontSize="md" flex={1}>
                        By creating an account, you&apos;re agreeing to our {''}
                        <ChakraLink
                          href="#"
                          color="text.primary"
                          cursor="pointer"
                        >
                          Privacy Policy
                        </ChakraLink>
                        , and {''}
                        <ChakraLink
                          href="#"
                          color="text.primary"
                          cursor="pointer"
                        >
                          Electronics Communication Policy.
                        </ChakraLink>
                      </Text>
                    </Checkbox>
                  )}
                />
              </Flex>
            </>
          )}
        </VStack>

        {/* Show API error */}
        <Box mb={7}>
          <Text color="red" textAlign="center" py={2} h={10}>
            {root?.message}
          </Text>
          <Button
            type="submit"
            role="button"
            aria-label={!isRegister ? 'Sign In' : 'Sign Up'}
            textTransform="capitalize"
            form={!isRegister ? 'login-form' : 'register-form'}
            isDisabled={isDisabledSubmitBtn}
          >
            {!isRegister ? 'Sign In' : 'Sign Up'}
          </Button>
        </Box>

        <Text fontWeight="medium" textAlign="center">
          {!isRegister
            ? 'Don&apos;t have an account?'
            : 'Already have an account?'}
          <Text
            as={Link}
            href={!isRegister ? `/${ROUTES.REGISTER}` : `/${ROUTES.LOGIN}`}
            aria-label={!isRegister ? 'sign up' : 'sign in'}
            fontWeight="semibold"
            textDecoration="underline"
            ml={2}
          >
            {!isRegister ? 'Sign Up' : 'Sign In'}
          </Text>
        </Text>
        <AuthFooter />
      </Box>
    </>
  );
};

const AuthForm = memo(AuthFormComponent);

export default AuthForm;
