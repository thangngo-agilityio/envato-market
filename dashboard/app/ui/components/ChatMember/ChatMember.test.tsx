import userEvent from '@testing-library/user-event';
import ChatMember from '../ChatMember';

const CHAT_MEMBER_PROPS = {
  name: 'Join',
  lastMessages: 'Hello',
  localeTime: '7h00',
};

describe('ChatMember component', () => {
  test('Should render match with snapshot.', () => {
    const { container } = render(<ChatMember {...CHAT_MEMBER_PROPS} />);

    expect(container).toMatchSnapshot();
  });

  test('call onClick when click member', async () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <ChatMember {...CHAT_MEMBER_PROPS} onClick={onClickMock} />,
    );

    const member = getByText('7h00');

    await userEvent.click(member);

    expect(onClickMock).toHaveBeenCalled();
  });
});
