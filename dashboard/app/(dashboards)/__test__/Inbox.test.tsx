// Sections
import Inbox from '../inbox/page';

// Utils
import { renderQueryProviderTest } from '@/lib/utils/testUtils';

describe('Inbox render', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      ...global.matchMedia,
      writable: true,
    });
  });

  test('Should render match with snapshot.', () => {
    const { container } = renderQueryProviderTest(<Inbox />);

    expect(container).toMatchSnapshot();
  });
});
