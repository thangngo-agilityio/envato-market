// Mocks
import { CONVERSATION_PROPS } from '@/lib/mocks';
import { Conversation } from '../..';

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
  mockMobileMediaQuery();
  test('Should render match with snapshot.', () => {
    const { container } = render(<Conversation {...CONVERSATION_PROPS} />);

    expect(container).toMatchSnapshot();
  });
});
