import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import { Pagination } from '@/ui/components';

const onPageChangeMock = jest.fn();
const onLimitChangeMock = jest.fn();
const onClickPageMock = jest.fn();

describe('Pagination render', () => {
  test('Should render match with snapshot.', () => {
    const { container } = render(
      <Pagination
        pageSize={10}
        currentPage={1}
        isDisableNext={true}
        isDisabledPrev={true}
        arrOfCurrButtons={[1]}
        onPageChange={onLimitChangeMock}
        onLimitChange={onLimitChangeMock}
        onClickPage={onClickPageMock}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('Handle click page', async () => {
    const { getByTestId } = render(
      <Pagination pageSize={10} onPageChange={onPageChangeMock} />,
    );

    const nextPage = getByTestId('next-button');

    await userEvent.click(nextPage);
    expect(onPageChangeMock).toHaveBeenCalled();
  });

  it('Handle next page', async () => {
    const { getByTestId } = render(
      <Pagination pageSize={8} onPageChange={onPageChangeMock} />,
    );

    const nextPage = getByTestId('next-button');

    await userEvent.click(nextPage);
    expect(onPageChangeMock).toHaveBeenCalled();
  });

  it('Handle prev page', async () => {
    const { getByTestId } = render(
      <Pagination
        pageSize={8}
        currentPage={2}
        onPageChange={onPageChangeMock}
      />,
    );

    const nextPage = getByTestId('prev-button');

    await userEvent.click(nextPage);
    expect(onPageChangeMock).toHaveBeenCalled();
  });

  it('Handle change limit', async () => {
    const { getByText } = render(
      <Pagination
        pageSize={8}
        currentPage={2}
        onPageChange={onPageChangeMock}
        onLimitChange={onLimitChangeMock}
      />,
    );

    const selectOption = getByText('50');
    await userEvent.click(selectOption);
    expect(onLimitChangeMock).toHaveBeenCalled();
  });

  it('Handle on click page', async () => {
    const { getByText } = render(
      <Pagination
        pageSize={8}
        currentPage={2}
        onPageChange={onPageChangeMock}
        onLimitChange={onLimitChangeMock}
        onClickPage={onClickPageMock}
      />,
    );

    const selectOption = getByText('50');
    await userEvent.click(selectOption);
    expect(onLimitChangeMock).toHaveBeenCalled();
  });
});
