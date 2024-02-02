import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getDocs } from 'firebase/firestore';

// Services
import { getAllUserDetailsExceptWithId } from '@/lib/services';

// Constants
import { AUTHENTICATION_ROLE } from '@/lib/constants';

// Hooks
import {
  getCurrentUser,
  getLists,
  getUserList,
  getUsers,
  useGetRoomChat,
} from '@/lib/hooks';

// Mocks
import { MOCK_USER_DETAIL } from '@/lib/mocks';

// Stores
import { authStore } from '@/lib/stores';

// Mock services
jest.mock('@/lib/services', () => ({
  getAllUserDetailsExceptWithId: jest.fn(),
}));

jest.mock('@/lib/stores', () => ({
  authStore: jest.fn(),
}));

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const mockAdmin = {
  uid: 'uidAdmin456',
  role: AUTHENTICATION_ROLE.SUPER_ADMIN,
  avatarURL: 'http://example.com/adminAvatar.jpg',
};

(getAllUserDetailsExceptWithId as jest.Mock).mockResolvedValue([mockAdmin]);

describe('useGetRoomChat', () => {
  it('returns the combined ID of the current user and admin user', () => {
    const mockUser = { id: 'user123' };

    (authStore as unknown as jest.Mock).mockImplementation((callback) =>
      callback({ user: mockUser }),
    );

    const { result } = renderHook(() => useGetRoomChat(), { wrapper });

    expect(result.current).toEqual('user123undefined');
  });
});

describe('getCurrentUser', () => {
  it('returns detailed information for the current user and admin', async () => {
    const result = await getCurrentUser(MOCK_USER_DETAIL);

    const expected = {
      roomChatId: 'uidAdmin4561',
      userId: '1',
      adminId: 'uidAdmin456',
      avatarUrl: 'https://cdn-icons-png.flaticon.com/512/5556/5556468.png',
      avatarAdminUrl: 'http://example.com/adminAvatar.jpg',
      displayName: 'Abdur Rohman ',
    };

    expect(result).toEqual(expected);
  });

  it('returns null or appropriate value when no admin is found', async () => {
    (getAllUserDetailsExceptWithId as jest.Mock).mockResolvedValue([]);

    const result = await getCurrentUser(MOCK_USER_DETAIL);

    const expected = {
      roomChatId: 'undefined1',
      userId: '1',
      adminId: '',
      avatarUrl: 'https://cdn-icons-png.flaticon.com/512/5556/5556468.png',
      avatarAdminUrl: '',
      displayName: 'Abdur Rohman ',
    };

    expect(result).toEqual(expected);
  });
});

describe('getUserList', () => {
  it('fetches and returns user list excluding the specified user', async () => {
    const mockUsers = [
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' },
    ];

    (getAllUserDetailsExceptWithId as jest.Mock).mockResolvedValue(mockUsers);

    const userList = await getUserList(MOCK_USER_DETAIL);

    expect(userList).toEqual(mockUsers);
  });
});

describe('getLists', () => {
  it('fetches and processes chat lists correctly', async () => {
    const mockUsersSnapshot = {
      docs: [
        { id: '1', data: () => ({ chat: 'Chat 1' }) },
        { id: '2', data: () => ({ chat: 'Chat 2' }) },
      ],
    };

    (getDocs as jest.Mock).mockResolvedValue(mockUsersSnapshot);

    const result = await getLists();

    const expected = {
      chatList: ['Chat 1', 'Chat 2'],
    };

    expect(result).toEqual(expected);
  });
});

describe('getUsers', () => {
  it('returns user details with admin when admin is found', async () => {
    const mockAdmin = {
      id: 'admin123',
      data: () => ({
        displayName: AUTHENTICATION_ROLE.SUPER_ADMIN,
        uid: 'adminUid',
      }),
    };

    const mockUsersSnapshot = {
      docs: [
        { id: 'user1', data: () => ({ displayName: 'User 1', uid: 'uid1' }) },
        { id: 'user2', data: () => ({ displayName: 'User 2', uid: 'uid2' }) },
        mockAdmin,
      ],
    };

    (getDocs as jest.Mock).mockResolvedValue(mockUsersSnapshot);

    const result = await getUsers();

    const expected = {
      roomChatId: 'adminUidundefined',
      userId: undefined,
      adminId: 'adminUid',
      listUserDetail: [
        {
          id: 'user1',
          data: {
            displayName: 'User 1',
            uid: 'uid1',
          },
        },
        {
          id: 'user2',
          data: {
            displayName: 'User 2',
            uid: 'uid2',
          },
        },
        {
          id: 'admin123',
          data: {
            displayName: 'Super Admin',
            uid: 'adminUid',
          },
        },
      ],
    };

    expect(result).toEqual(expected);
  });
});
