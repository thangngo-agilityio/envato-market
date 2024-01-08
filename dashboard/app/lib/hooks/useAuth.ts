import { useCallback } from 'react';
import { AxiosResponse } from 'axios';
import { shallow } from 'zustand/shallow';

// Constants
import {
  END_POINTS,
  SEARCH_PARAM,
  ERROR_MESSAGES,
  IMAGES,
} from '@/lib/constants';

// Services
import { UsersHttpService } from '@/lib/services';

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
      const { data = [] }: AxiosResponse<TUserDetail[] | undefined> =
        await UsersHttpService.get<TUserDetail[] | undefined>(
          `${END_POINTS.USERS}?${SEARCH_PARAM.EMAIL}=${email}&${SEARCH_PARAM.PASSWORD}=${password}`,
        );

      // Because search by params working incorrect
      const user: TUserDetail | undefined = data.find(
        (user) => user.email === email && user.password === password,
      );

      if (!user) {
        throw new Error(ERROR_MESSAGES.AUTH_INCORRECT);
      }

      const { password: _, ...userInfo } = user;

      return updateStore({
        user: userInfo,
        isRemember,
        date: getCurrentTimeSeconds(),
      });
    },
    [updateStore],
  );

  const handleSignUp = useCallback(
    async (
      userInfo: Omit<TUserDetail, 'id' | 'createdAt'>,
    ): Promise<{
      errors?: TSignUpErrorField;
    }> => {
      const { email, password } = userInfo;
      const { data = [] }: AxiosResponse<TUserDetail[] | undefined> =
        await UsersHttpService.get<TUserDetail[] | undefined>(
          `${END_POINTS.USERS}?${SEARCH_PARAM.EMAIL}=${email}&${SEARCH_PARAM.PASSWORD}=${password}`,
        );

      // Because search by params working incorrect
      const user: TUserDetail | undefined = data.find(
        (user) => user.email === email,
      );

      if (user) {
        return {
          errors: {
            email: ERROR_MESSAGES.ACCOUNT_ALREADY_EXISTS,
          },
        };
      }

      // Send request add new user
      const { password: _, ...response }: TUserDetail =
        await UsersHttpService.post<TUserDetail>(
          END_POINTS.USERS,
          {
            ...userInfo,
            avatarURL: IMAGES.AVATAR_SIGN_UP.url,
            createdAt: Date.now(),
          },
          {},
        ).then((res) => res.data);

      // Save user into store
      updateStore({ user: response, date: getCurrentTimeSeconds() });

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
