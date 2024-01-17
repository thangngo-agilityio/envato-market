import { render, waitFor } from '@testing-library/react';

// Components
import { CustomerIssues } from '@app/components';
import userEvent from '@testing-library/user-event';

const fetchNextPage = jest.fn();
jest.mock('@app/hooks', () => ({
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
    const { getByTestId } = render(
      <CustomerIssues onLoadMore={fetchNextPage} />,
    );

    const showMoreButton = getByTestId('Load more');
    await userEvent.click(showMoreButton);

    await waitFor(() => expect(fetchNextPage).toHaveBeenCalled());
  });
});
