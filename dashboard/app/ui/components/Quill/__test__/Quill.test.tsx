import preloadAll from 'jest-next-dynamic';
import Quill from '..';
import userEvent from '@testing-library/user-event';
import { getUserList } from '@/lib/hooks';
import { MOCK_USER_DETAIL } from '@/lib/mocks';

const sendMessageMock = jest.fn();
const authStoreMock = jest.fn();

jest.mock('@/lib/utils', () => ({
  ...jest.requireActual('@/lib/utils'),
  sendMessage: () => sendMessageMock,
}));

jest.mock('@/lib/hooks', () => ({
  ...jest.requireActual('@/lib/hooks'),
  getUserList: jest.fn(),
}));

jest.mock('@/lib/stores', () => ({
  ...jest.requireActual('@/lib/stores'),
  authStore: () => authStoreMock,
}));

describe('Quill component', () => {
  beforeAll(async () => {
    await preloadAll();
    authStoreMock.mockReturnValue({
      user: MOCK_USER_DETAIL,
    });
  });
  it('renders correctly', () => {
    const { container } = render(<Quill userUid="1" />);
    expect(container).toMatchSnapshot();
  });

  it('handle send when enter', async () => {
    const mockData = [{ _id: '1', uid: '1' }];
    (getUserList as jest.Mock).mockResolvedValue(mockData);
    const { container } = render(<Quill userUid="1" />);
    const quill = container.querySelector('.quill');
    if (quill) {
      await userEvent.type(quill, 'hello');
      fireEvent.keyDown(quill, { key: 'Enter', code: 'Enter' });
      waitFor(() => {
        expect(sendMessageMock).toHaveBeenCalled();
      });
    }
  });
});
