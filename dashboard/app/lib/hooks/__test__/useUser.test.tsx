import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';

// Hooks
import {
  useCreateIssues,
  useGetListIssues,
  useGetUserDetails,
  useUpdatePassword,
  useUpdateUser,
} from '@/lib/hooks';

// Interfaces
import { TUserDetail } from '@/lib/interfaces';

// Services
import * as services from '@/lib/services';

import { UsersHttpService } from '@/lib/services';

const queryClient = new QueryClient();

const data: TUserDetail = {
  address: 'address',
  city: 'Jakarta',
  country: 'Indonesia',
  createdAt: 0,
  email: 'test@gmail.com',
  firstName: 'Abdur',
  id: '1',
  lastName: 'Rohman',
  password: 'test@123',
  phoneNumber: '123123',
  postalCode: '154353',
  isBlock: true,
  uid: '1',
};

jest.mock('@/lib/services');

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useUpdateUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('update user successfully', async () => {
    const { result } = renderHook(() => useUpdateUser(), { wrapper });

    act(() => {
      result.current.mutate(data);
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.isSuccess).toBe(true);
  });

  it('update user failed', async () => {
    const { result } = renderHook(() => useUpdateUser(), { wrapper });
    jest.spyOn(UsersHttpService, 'put').mockRejectedValue(new Error('error'));

    act(() => {
      result.current.mutate(data);
    });

    await waitFor(() => result.current.isError);

    expect(result.current.isError).toBe(true);
  });

  it('successfully updates the password', async () => {
    const mockData = {
      oldPassword: 'old123',
      newPassword: 'new123',
      memberId: '123',
    };
    const mockPut = jest.fn();
    mockPut.mockResolvedValueOnce({ data: 'Success' });

    const { result } = renderHook(() => useUpdatePassword(), { wrapper });

    act(() => {
      result.current.mutate(mockData);
    });

    expect(result.current.error).toBe('');
  });

  it('calls useMutation with the correct parameters', () => {
    const mockData = {
      userId: '12',
      firstName: 'John',
      lastName: 'Does',
      email: 'test@gmail.com',
      phone: '0121234242',
      title: 'test title',
      description: 'test description',
    };

    const { result } = renderHook(() => useCreateIssues(), { wrapper });

    act(() => {
      result.current.mutate(mockData);
    });

    expect(result.current.error).toBe('');
  });

  it('calls useQuery with the correct parameters', () => {
    const getAllUserDetailsExceptWithIdSpy = jest.spyOn(
      services,
      'getAllUserDetailsExceptWithId',
    );
    getAllUserDetailsExceptWithIdSpy.mockResolvedValue([
      {
        _id: '1',
        title: 'What is the issues',
        avatarURL: 'https://cdn-icons-png.flaticon.com/512/5556/5556468.png',
        password: '123456',
        phoneNumber: '02342423',
        country: 'LD',
        city: 'DL',
        address: '123 TMT',
        postalCode: '1234',
        firstName: 'Abdur',
        lastName: 'Rohman',
        email: 'test@gmail.com',
        role: 'member',
        description: 'description',
        createdAt: 3123123,
        isBlock: false,
        uid: '1',
      },
    ]);

    const { result } = renderHook(
      () => useGetUserDetails('12345', { name: '' }),
      { wrapper },
    );

    expect(result.current.isLoading).toBe(true);
  });

  test('Should return data when call useFetchProductDetail success', async () => {
    jest.spyOn(services, 'getSupports').mockResolvedValue({
      data: {
        result: [
          {
            _id: '123',
            firstName: 'John',
            lastName: 'Does',
            email: 'test@gmail.com',
            phone: '01212465433',
            title: 'Test title',
            description: 'Test description',
            userId: '1',
            avatar:
              'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/af53d53d-561f-450a-a483-70a7ceee380f/dunk-low-shoes-t9dFBx.png',
            createdAt: '11111111111',
            updatedAt: '22222222222',
          },
        ],
        totalPage: 12,
      },
      pageParams: 1,
    });
    const { result } = renderHook(() => useGetListIssues(), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual([
        {
          _id: '123',
          avatar:
            'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/af53d53d-561f-450a-a483-70a7ceee380f/dunk-low-shoes-t9dFBx.png',
          createdAt: '11111111111',
          description: 'Test description',
          email: 'test@gmail.com',
          firstName: 'John',
          lastName: 'Does',
          phone: '01212465433',
          title: 'Test title',
          updatedAt: '22222222222',
          userId: '1',
        },
      ]);
      expect(result.current.isSuccess).toEqual(true);
    });
  });

  it('calls mutation function with the correct arguments', async () => {
    const { result } = renderHook(() => useGetUserDetails('123'), { wrapper });

    result.current.managementUser({
      userId: '456',
      memberId: '789',
      urlEndpoint: '/update-user',
    });

    expect(result.current.isSuccess).toBe(true);
  });
});
