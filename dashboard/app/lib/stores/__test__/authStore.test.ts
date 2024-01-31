/* eslint-disable quotes */
import { StorageValue } from 'zustand/middleware';

// Stores
import { TAuthStoreAction, TAuthStoreData, authStore } from '..';

// Constants
import { STORE_KEY } from '@/lib/constants';

// Utils
import { getValueFromLocalStore } from '@/lib/utils';

// Mocks
import { MOCK_USER_DATA } from '@/lib/mocks';

const setup = () =>
  testLibReactUtils.renderHook<TAuthStoreData & TAuthStoreAction, unknown>(
    authStore,
  );

describe('Authentication store', () => {
  it("Hasn't user", () => {
    const { result } = setup();

    expect(result.current.user).toBeFalsy();
  });

  it('Add user', async () => {
    const {
      result: { current },
    } = setup();

    await testLibReactUtils.act(async () => {
      current.updateStore(MOCK_USER_DATA as unknown as TAuthStoreData);
    });

    const {
      state: { user },
    }: StorageValue<TAuthStoreData & TAuthStoreAction> = JSON.parse(
      getValueFromLocalStore(STORE_KEY.AUTH),
    );

    expect(user).not.toBe(null);
  });

  it('Update user', async () => {
    const {
      result: { current },
    } = setup();

    await testLibReactUtils.act(async () => {
      current.updateStore(MOCK_USER_DATA as unknown as TAuthStoreData);
    });
    expect(current.user).not.toBe(null);

    const {
      state: { user: userBeforeUpdate },
    }: StorageValue<TAuthStoreData> = JSON.parse(
      getValueFromLocalStore(STORE_KEY.AUTH),
    );

    expect(userBeforeUpdate).toEqual(MOCK_USER_DATA.user);

    const updateUser: TAuthStoreData = {
      ...MOCK_USER_DATA,
      user: {
        ...MOCK_USER_DATA.user,
        firstName: 'Duong 1',
        lastName: 'Pham 2',
      },
    } as unknown as TAuthStoreData;
    await testLibReactUtils.act(async () => {
      current.updateStore(updateUser);
    });
    const {
      state: { user: userAfterUpdate },
    }: StorageValue<TAuthStoreData> = JSON.parse(
      getValueFromLocalStore(STORE_KEY.AUTH),
    );

    expect(userAfterUpdate).not.toEqual(null);
    expect(userAfterUpdate).toEqual(updateUser.user);
  });

  it('Clear store', async () => {
    const {
      result: { current },
    } = setup();

    await testLibReactUtils.act(async () => {
      current.updateStore(MOCK_USER_DATA as unknown as TAuthStoreData);
    });
    expect(current.user).not.toBe(null);

    const {
      state: { user },
    }: StorageValue<TAuthStoreData> = JSON.parse(
      getValueFromLocalStore(STORE_KEY.AUTH),
    );

    expect(user).toEqual(MOCK_USER_DATA.user);

    await testLibReactUtils.act(async () => {
      current.clearStore();
    });

    expect(user).not.toEqual(null);
    expect(getValueFromLocalStore(STORE_KEY.AUTH)).toBeFalsy();
  });
});
