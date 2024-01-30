import { act, renderHook } from '@testing-library/react';
import { AxiosResponse } from 'axios';

// Hooks
import { useAuth } from '@/lib/hooks';

// Services
import { AuthenticationHttpService } from '@/lib/services';

// Constants
import { ERROR_MESSAGES } from '@/lib/constants';

// Stores
import { authStore } from '@/lib/stores';

// Types
import { TUserDetail } from '@/lib/interfaces';

const setup = () => renderHook(useAuth);
const SIGN_IN_PARAM = {
  email: 'duong.pham@asnet.com.vn',
  password: 'Abcd@1231',
};
const SIGN_UP_PARAM = {
  email: 'duong.pham@asnet.com.vn',
  password: 'Abcd@1231',
  firstName: 'Duong',
  lastName: 'Pham',
  fcmToken: 'hihi',
  phoneNumber: '012345687',
  country: 'VN',
  city: 'DN',
  address: '192 XVNT',
  postalCode: '214',
  isBlock: true,
  uid: '1',
};

describe('useAuth', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('SignIn fail', async () => {
    try {
      jest.spyOn(AuthenticationHttpService, 'post').mockResolvedValue({
        data: undefined,
      } as AxiosResponse);
      const {
        result: {
          current: { signIn },
        },
      } = setup();

      await signIn(SIGN_IN_PARAM);
    } catch (error) {
      const { message } = error as Error;

      expect(message).toBe(ERROR_MESSAGES.AUTH_INCORRECT);
    }
  });

  // TODO: Update later
  // it('SignIn success', async () => {
  //   jest.spyOn(AuthenticationHttpService, 'post').mockResolvedValue({
  //     data: [SIGN_IN_PARAM],
  //   } as AxiosResponse);
  //   const {
  //     result: {
  //       current: { signIn },
  //     },
  //   } = setup();
  //   await act(async () => {
  //     await signIn(SIGN_IN_PARAM);
  //   });

  //   expect(authStore.getState().user).toEqual([
  //     {
  //       email: SIGN_IN_PARAM.email,
  //       password: SIGN_IN_PARAM.password,
  //     },
  //   ]);
  // });

  it('SignUp success', async () => {
    jest.spyOn(AuthenticationHttpService, 'post').mockResolvedValue({
      data: SIGN_IN_PARAM,
    } as AxiosResponse);

    const {
      result: {
        current: { signUp },
      },
    } = setup();
    await act(async () => {
      await signUp(SIGN_UP_PARAM);
    });

    expect(authStore.getState().user).toEqual({
      email: SIGN_UP_PARAM.email,
      password: SIGN_UP_PARAM.password,
    });
  });

  it('Set profile', async () => {
    const {
      result: {
        current: { setUser },
      },
    } = setup();
    await act(async () => {
      await setUser({ user: SIGN_IN_PARAM as TUserDetail });
    });

    expect(authStore.getState().user).toEqual(SIGN_IN_PARAM);
  });

  it('SignOut', async () => {
    const {
      result: {
        current: { signOut },
      },
    } = setup();
    await act(async () => {
      await authStore.setState({ user: SIGN_IN_PARAM as TUserDetail });
    });

    expect(authStore.getState().user).toEqual(SIGN_IN_PARAM);

    await act(async () => {
      await signOut();
    });

    expect(authStore.getState().user).toBe(null);
  });
});
