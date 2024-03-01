// Components
import BoxChat from '@/ui/components/BoxChat';

// Stores
import { authStore } from '@/lib/stores';

// Mocks
import { MOCK_USER_DETAIL, USER_DATA } from '@/lib/mocks';

const getInfoRoomChatMock = jest.fn();

jest.mock('@/lib/hooks', () => ({
  ...jest.requireActual('@/lib/hooks'),
  getInfoRoomChat: () => getInfoRoomChatMock,
}));

const roomChatId = 'GmCJFXqXubfAPdKs56C4Sq7DisY2lBNWnoNBQGZ260KgnF9NxQCPlqf1';

describe('BoxChatComponent', () => {
  beforeEach(() => {
    authStore.setState({
      user: MOCK_USER_DETAIL,
    });
  });
  test('BoxChat component renders user have roomChatId', () => {
    getInfoRoomChatMock.mockReturnValue({ ...USER_DATA, roomChatId });
    const { container } = render(<BoxChat />);
    expect(container).toMatchSnapshot();
  });

  test('BoxChat component renders user without roomChatId', () => {
    getInfoRoomChatMock.mockReturnValue(USER_DATA);
    const { container } = render(<BoxChat />);
    expect(container).toMatchSnapshot();
  });
});
