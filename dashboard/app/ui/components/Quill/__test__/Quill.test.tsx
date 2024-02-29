import preloadAll from 'jest-next-dynamic';
import Quill from '..';
import userEvent from '@testing-library/user-event';
import { MOCK_USER_DETAIL } from '@/lib/mocks';
import { IMAGES } from '@/lib/constants';

const sendMessageMock = jest.fn();
const authStoreMock = jest.fn();

jest.mock('@/lib/utils', () => ({
  ...jest.requireActual('@/lib/utils'),
  sendMessage: () => sendMessageMock,
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
    const { container } = render(
      <Quill userUid="1" avatarUser={IMAGES.AVATAR.url} nameUser="Loc Vo " />,
    );
    expect(container).toMatchSnapshot();
  });

  it('handle send when enter', async () => {
    const { container } = render(
      <Quill userUid="1" avatarUser={IMAGES.AVATAR.url} nameUser="Loc Vo " />,
    );
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
