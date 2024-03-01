import { render, screen, waitFor } from '@testing-library/react';
import InputSendMessages from '..';
import { RefObject } from 'react';
import userEvent from '@testing-library/user-event';

// Mocks
import {
  MOCK_ROOM_CHAT_USER,
  MOCK_USER_DETAIL_WITHOUT_IMAGE,
} from '@/lib/mocks';

const getInfoRoomChatMock = jest.fn();
const sendMessageMock = jest.fn();
const authStoreMock = jest.fn();

jest.mock('@/lib/hooks', () => ({
  ...jest.requireActual('@/lib/hooks'),
  getInfoRoomChat: () => getInfoRoomChatMock,
}));

jest.mock('@/lib/utils', () => ({
  ...jest.requireActual('@/lib/utils'),
  sendMessage: () => sendMessageMock,
}));

jest.mock('@/lib/stores', () => ({
  ...jest.requireActual('@/lib/stores'),
  authStore: () => authStoreMock,
}));

const boxRef = {
  current: { scrollTop: 0, scrollHeight: 100 },
} as RefObject<HTMLDivElement>;

const setup = () => render(<InputSendMessages boxRef={boxRef} />);

describe('InputSendMessages  component', () => {
  it('Should render correctly', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('renders component correctly', () => {
    setup();

    expect(
      screen.getByPlaceholderText('Type your message...'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('btn-send')).toBeInTheDocument();
  });

  it('sends a message on button click', async () => {
    getInfoRoomChatMock.mockReturnValue(MOCK_ROOM_CHAT_USER);
    authStoreMock.mockReturnValue({
      user: MOCK_USER_DETAIL_WITHOUT_IMAGE,
    });
    setup();

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce({}),
    });

    await userEvent.type(
      screen.getByPlaceholderText('Type your message...'),
      'Hello, World!',
    );

    await userEvent.click(screen.getByTestId('btn-send'));

    waitFor(() => {
      expect(sendMessageMock).toHaveBeenCalled();
    });
  });
});
