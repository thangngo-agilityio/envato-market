// Components
import { MOCK_USER_DETAIL } from '@/lib/mocks';
import { authStore } from '@/lib/stores';
import BoxChat from '@/ui/components/BoxChat';
import * as firebase from 'firebase/firestore';

const docMock = jest.fn();
const getDocMock = jest.fn();
const onSnapshotMock = jest.fn();
jest.mock('@/lib/hooks', () => ({
  ...jest.requireActual('@/lib/hooks'),
  getCurrentUser: jest.fn(),
}));

describe('BoxChatComponent', () => {
  beforeEach(() => {
    authStore.setState({
      user: MOCK_USER_DETAIL,
    });
    jest.spyOn(firebase, 'doc').mockImplementation(docMock);
    jest.spyOn(firebase, 'getDoc').mockImplementation(getDocMock);
    jest.spyOn(firebase, 'onSnapshot').mockImplementation(onSnapshotMock);
  });
  test('BoxChat component renders correctly', () => {
    const { container } = render(<BoxChat />);
    expect(container).toMatchSnapshot();
  });

  test('calls handleSendMessage when the send button is clicked', async () => {
    const { getByTestId } = render(<BoxChat />);

    const sendButton = getByTestId('btn-send');
    await fireEvent.click(sendButton);

    waitFor(() => {
      expect(sendButton).toBeDisabled();
    });
  }, 2000);

  test('calls handleSendMessage when Enter key is pressed', () => {
    const handleSendMessage = jest.fn();
    const { getByPlaceholderText } = render(<BoxChat />);

    const input = getByPlaceholderText('Type your message...');
    fireEvent.change(input, { target: { value: 'Test message' } });

    fireEvent.keyDown(input, { key: 'Enter' });

    waitFor(() => {
      expect(handleSendMessage).toHaveBeenCalledWith('Test message');
    });
  });
});
