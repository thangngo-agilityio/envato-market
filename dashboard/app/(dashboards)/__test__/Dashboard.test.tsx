import { QueryProvider } from '@/ui/providers';
import Dashboard from '../page';
import { useSearchParams } from 'next/navigation';

describe('Dashboard render', () => {
  beforeAll(async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(),
      forEach: jest.fn(),
    });
  });

  test('Should render match with snapshot.', async () => {
    const { container } = render(await Dashboard(), { wrapper: QueryProvider });
    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
