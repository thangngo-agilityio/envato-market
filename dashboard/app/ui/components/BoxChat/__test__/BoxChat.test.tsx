// Components
import { MOCK_USER_DETAIL } from '@/lib/mocks';
import { authStore } from '@/lib/stores';
import BoxChat from '@/ui/components/BoxChat';

const getCurrentUserMock = jest.fn();

jest.mock('@/lib/hooks', () => ({
  ...jest.requireActual('@/lib/hooks'),
  getCurrentUser: () => getCurrentUserMock,
}));

const userData = {
  userId: '123',
  adminId: 'admin123',
  avatarUrl: 'avatar-url',
  avatarAdminUrl: 'admin-avatar-url',
  displayName: 'John Doe',
};

const roomChatId = 'GmCJFXqXubfAPdKs56C4Sq7DisY2lBNWnoNBQGZ260KgnF9NxQCPlqf1';

describe('BoxChatComponent', () => {
  beforeEach(() => {
    authStore.setState({
      user: MOCK_USER_DETAIL,
    });
  });
  test('BoxChat component renders user have roomChatId', () => {
    getCurrentUserMock.mockReturnValue({ ...userData, roomChatId });
    const { container } = render(<BoxChat />);
    expect(container).toMatchSnapshot();
  });

  test('BoxChat component renders user without roomChatId', () => {
    getCurrentUserMock.mockReturnValue(userData);
    const { container } = render(<BoxChat />);
    expect(container).toMatchSnapshot();
  });
});
