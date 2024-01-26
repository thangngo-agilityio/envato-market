// Sections

import { usePathname, useSearchParams } from 'next/navigation';
import HistoryPage from '../histories/page';
import { useRouter } from 'next/router';

const { render } = testLibReactUtils;

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('HistoryPage render', () => {
  const mockGet = jest.fn();
  (useSearchParams as jest.Mock).mockReturnValue({
    get: mockGet,
  });

  (usePathname as jest.Mock).mockReturnValue(() => '');

  (useRouter as jest.Mock).mockReturnValue(() => ({
    push: jest.fn(),
  }));

  test('Should render match with snapshot.', () => {
    const { container } = render(<HistoryPage />);

    expect(container).toMatchSnapshot();
  });
});
