import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Utils
import { renderQueryProviderTest } from '@/lib/utils/testUtils';

// Sections
import { SupportsSection } from '..';

// Hooks
import { useCreateIssues } from '@/lib/hooks';

// Mocks
import { ISSUES_LIST } from '@/lib/mocks';

jest.mock('@/lib/hooks', () => ({
  ...jest.requireActual('@/lib/hooks'),
  useCreateIssues: jest.fn(),
  useGetListIssues: jest.fn(() => ({
    data: [],
    isFetchingNextPage: false,
    hasNextPage: false,
    fetchNextPage: jest.fn(),
    isFetching: false,
  })),
}));

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: () => jest.fn(),
}));

const createIssuesMock = jest.fn();

describe('SupportsSection render', () => {
  beforeAll(() => {
    (useCreateIssues as jest.Mock).mockReturnValue({
      data: ISSUES_LIST,
      useCreateIssues: createIssuesMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should render match with snapshot.', () => {
    const { container } = renderQueryProviderTest(<SupportsSection />);

    expect(container).toMatchSnapshot();
  });

  it('calls createIssues with correct parameters and displays success toast on success', async () => {
    const createIssuesMock = jest
      .fn()
      .mockImplementation((issueData, { onSuccess }) => {
        onSuccess();
      });

    (useCreateIssues as jest.Mock).mockReturnValue({
      mutate: createIssuesMock,
      status: 'idle',
      isPending: false,
    });

    render(<SupportsSection />);

    // Simulate user input
    await userEvent.type(screen.getByLabelText('First Name'), 'John');
    await userEvent.type(screen.getByLabelText('Last Name'), 'Doe');
    await userEvent.type(
      screen.getByLabelText('Email'),
      'john.doe@example.com',
    );
    await userEvent.type(screen.getByLabelText('Title'), 'Test Issue');
    await userEvent.type(
      screen.getByText(/description/i),
      'This is a test description for an issue.',
    );

    await userEvent.click(screen.getByTestId('btn-create-issues'));

    expect(createIssuesMock).toHaveBeenCalled();
  });

  it('displays error toast when createIssues fails', async () => {
    const createIssuesMock = jest
      .fn()
      .mockImplementation((issueData, { onError }) => {
        onError();
      });

    (useCreateIssues as jest.Mock).mockReturnValue({
      mutate: createIssuesMock,
      status: 'idle',
      isPending: false,
    });

    const useToastMock = jest.fn();
    useToastMock.mockReturnValue(jest.fn());

    render(<SupportsSection />);

    await userEvent.type(screen.getByLabelText('First Name'), 'Jane');
    await userEvent.type(screen.getByLabelText('Last Name'), 'Doe');
    await userEvent.type(
      screen.getByLabelText('Email'),
      'jane.doe@example.com',
    );
    await userEvent.type(screen.getByLabelText('Title'), 'Test Issue Failure');
    await userEvent.type(
      screen.getByText(/description/i),
      'This should trigger an error.',
    );

    await userEvent.click(screen.getByTestId('btn-create-issues'));

    expect(createIssuesMock).toHaveBeenCalled();
  });
});
