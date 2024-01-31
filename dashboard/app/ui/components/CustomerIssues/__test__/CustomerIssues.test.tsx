import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import { CustomerIssues } from '@/ui/components';
import { CUSTOMER_ISSUE_MOCK } from '@/lib/mocks';

const fetchNextPage = jest.fn();
jest.mock('@/lib/hooks', () => ({
  useGetListIssues: () => ({
    fetchNextPage,
    hasNextPage: true,
    isLoading: false,
    isFetchingNextPage: false,
  }),
}));

describe('CustomerIssues render', () => {
  test('Should render match with snapshot.', () => {
    const { container } = render(<CustomerIssues onLoadMore={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });

  test('calls fetchNextPage on button click', async () => {
    const { getByText } = render(<CustomerIssues onLoadMore={fetchNextPage} />);

    const showMoreButton = getByText('Load More');
    await userEvent.click(showMoreButton);

    await waitFor(() => expect(fetchNextPage).toHaveBeenCalled());
  });

  it('displays "Recent Support" text', () => {
    const { getByText } = render(
      <CustomerIssues dataList={CUSTOMER_ISSUE_MOCK} onLoadMore={jest.fn()} />,
    );
    expect(getByText('Recent Support')).toBeInTheDocument();
  });
});
