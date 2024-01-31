import { waitFor } from '@testing-library/react';
import { useSearchParams } from 'next/navigation';

// Pages
import UsersPage from '../users/page';

// Utils
import { renderQueryProviderTest } from '@/lib/utils/testUtils';

describe('UsersPage render', () => {
  (useSearchParams as jest.Mock).mockReturnValue({
    get: jest.fn(),
  });

  it('renders the UsersSection after prefetching users', async () => {
    const { container } = renderQueryProviderTest(<UsersPage />);

    await waitFor(() => expect(container).toMatchSnapshot());
  });
});
