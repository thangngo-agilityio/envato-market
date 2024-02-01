import userEvent from '@testing-library/user-event';
import ChatMember from '../ChatMember';

const CHAT_MEMBER_PROPS = {
  name: 'Join',
  lastMessages: 'Hello',
  localeTime: '7h00',
};

const mockMobileMediaQuery = () =>
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
      matches: true,
      media: '480px',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

describe('ChatMember component', () => {
  test('Should render match with snapshot.', () => {
    mockMobileMediaQuery();
    const { container } = render(<ChatMember {...CHAT_MEMBER_PROPS} />);

    expect(container).toMatchSnapshot();
  });

  test('call onClick when click member', async () => {
    mockMobileMediaQuery();
    const onClickMock = jest.fn();
    const { getByText } = render(
      <ChatMember {...CHAT_MEMBER_PROPS} onClick={onClickMock} />,
    );

    const member = getByText('7h00');

    await userEvent.click(member);

    expect(onClickMock).toHaveBeenCalled();
  });
});
