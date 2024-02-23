import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

// Utils
import { renderQueryProviderTest } from '@/lib/utils/testUtils';

// Sections
const TransactionSection = dynamic(
  () => import('..').then((mod) => mod.TransactionSection),
  { ssr: false },
);

jest.mock('react-intersection-observer');

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

describe('ChatMemberList render', () => {
  beforeEach(() => {
    // Setup router and searchParams mocks
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: jest.fn(),
    }));
    (useSearchParams as jest.Mock).mockImplementation(
      () => new URLSearchParams(),
    );

    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(),
    });
  });

  test('Should render match with snapshot.', () => {
    mockMobileMediaQuery();

    const { container } = renderQueryProviderTest(<TransactionSection />);

    expect(container).toMatchSnapshot();
  });
});
