import { useCallback } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { shallow } from 'zustand/shallow';

// Constants
import { END_POINTS, ERROR_MESSAGES, IMAGES } from '@/lib/constants';

// Services
import { AuthenticationHttpService } from '@/lib/services';

// Types
import { TUserDetail } from '@/lib/interfaces/user';

// Utils
import { getCurrentTimeSeconds } from '@/lib/utils';

// Stores
import { authStore } from '@/lib/stores';

type TSignUpErrorField = Partial<
  Record<keyof Omit<TUserDetail, 'id' | 'createdAt'>, string>
>;

export type TUserInfo = Omit<TUserDetail, 'password'> | null;

export type TUserAxiosResponse = Omit<
  TUserDetail & { _id: string },
  'id'
> | null;

export type TUseAuth = {
  user: TUserInfo;
  isRemember: boolean;
  date: number;
  setUser: (user: TUserDetail) => void;
  signIn: (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    isRemember?: boolean,
  ) => Promise<void>;
  signUp: (userInfo: Omit<TUserDetail, 'id' | 'createdAt'>) => Promise<{
    errors?: TSignUpErrorField;
  }>;
  signOut: () => void;
};

export const useAuth = () => {
  const { updateStore, clearStore } = authStore(
    (state) => ({
      updateStore: state.updateStore,
      clearStore: state.clearStore,
    }),
    shallow,
  );

  const handleSignIn = useCallback(
    async (
      {
        email,
        password,
      }: {
        email: string;
        password: string;
      },
      isRemember?: boolean,
    ): Promise<void> => {
      try {
        const { data }: AxiosResponse<TUserAxiosResponse | undefined> =
          await AuthenticationHttpService.post<TUserAxiosResponse | undefined>(
            `${END_POINTS.SIGN_IN}`,
            {
              email,
              password,
            },
            {},
          );

        let localData: TUserInfo | undefined;
        if (data) {
          const { _id, ...rest } = data;
          localData = { ...rest, id: _id };
        }

        return updateStore({
          user: localData,
          isRemember,
          date: getCurrentTimeSeconds(),
        });
      } catch (error) {
        const { response } = error as AxiosError<{ message: string }>;

        throw new Error(response?.data.message);
      }
    },
    [updateStore],
  );

  const handleSignUp = useCallback(
    async (
      userInfo: Omit<TUserDetail, 'id' | 'createdAt'>,
    ): Promise<{
      errors?: TSignUpErrorField;
    }> => {
      const { email, password, firstName, lastName } = userInfo;
      try {
        const { data }: AxiosResponse<TUserAxiosResponse | undefined> =
          await AuthenticationHttpService.post<TUserAxiosResponse | undefined>(
            `${END_POINTS.SIGN_UP}`,
            {
              ...userInfo,
              avatarURL: IMAGES.AVATAR_SIGN_UP.url,
              createdAt: Date.now(),
              email,
              password,
              firstName,
              lastName,
            },
            {},
          );

        let localData: TUserInfo | undefined;
        if (data) {
          const { _id, ...rest } = data;
          localData = { ...rest, id: _id };
        }

        updateStore({ user: localData, date: getCurrentTimeSeconds() });
      } catch (error) {
        return {
          errors: {
            email: ERROR_MESSAGES.ACCOUNT_ALREADY_EXISTS,
          },
        };
      }

      return {};
    },
    [updateStore],
  );

  return {
    setUser: updateStore,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: clearStore,
  };
};
