import { useRouter, useSearchParams } from 'next/navigation';

// Utils
import { renderQueryProviderTest } from '@/lib/utils/testUtils';

// Sections
import ChatMemberList from '../Inbox';

describe('ChatMemberList render', () => {
  beforeEach(() => {
    // Setup router and searchParams mocks
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: jest.fn(),
    }));
    (useSearchParams as jest.Mock).mockImplementation(
      () => new URLSearchParams(),
    );
  });

  test('Should render match with snapshot.', () => {
    const { container } = renderQueryProviderTest(<ChatMemberList />);

    expect(container).toMatchSnapshot();
  });
});
