import { useRouter, useSearchParams } from "next/navigation";

// Utils
import { renderQueryProviderTest } from "@/lib/utils/testUtils";

// Sections
import ChatMemberList from "../Inbox";

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

beforeEach(() => {
  // Setup router and searchParams mocks
  (useRouter as jest.Mock).mockImplementation(() => ({
    push: jest.fn(),
  }));
  (useSearchParams as jest.Mock).mockImplementation(() => new URLSearchParams());
});

describe('ChatMemberList render', () => {
  test('Should render match with snapshot.', () => {
    mockMobileMediaQuery();

    const { container } = renderQueryProviderTest(<ChatMemberList />);

    expect(container).toMatchSnapshot();
  });
});
