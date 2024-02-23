import { usePathname, useSearchParams, useRouter } from 'next/navigation';

// Sections
import HistoryPage from '../histories/page';
import { renderQueryProviderTest } from '@/lib/utils/testUtils';

jest.mock('react-intersection-observer');

describe('HistoryPage render', () => {
  (useSearchParams as jest.Mock).mockReturnValue({
    get: jest.fn(),
  });

  (usePathname as jest.Mock).mockReturnValue(() => '');

  (useRouter as jest.Mock).mockReturnValue({
    pathname: '/test',
    query: { name: 'testQuery' },
    push: jest.fn(),
    replace: jest.fn(),
  });

  test('Should render match with snapshot.', () => {
    const { container } = renderQueryProviderTest(<HistoryPage />);

    expect(container).toMatchSnapshot();
  });
});
