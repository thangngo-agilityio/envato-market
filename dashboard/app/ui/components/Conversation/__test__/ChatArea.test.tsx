import userEvent from '@testing-library/user-event';
import ChatAreaMemoried from '../ChatArea';

const { render } = testLibReactUtils;

describe('ChatAreaMemoried render', () => {
  const onSendMessageMock = jest.fn();

  test('Should render match with snapshot.', () => {
    const { container } = render(
      <ChatAreaMemoried onSendMessage={onSendMessageMock} />,
    );

    expect(container).toMatchSnapshot();
  });

  test('Should render with onClick send message', async () => {
    const { getByTestId } = render(
      <ChatAreaMemoried onSendMessage={onSendMessageMock} />,
    );

    const submitButton = getByTestId('submit-send-message');

    await userEvent.click(submitButton);
    expect(onSendMessageMock).toHaveBeenCalled();
  });
});
