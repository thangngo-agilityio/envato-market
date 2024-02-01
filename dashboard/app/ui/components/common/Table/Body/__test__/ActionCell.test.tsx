// library
import { render } from '@testing-library/react';
import { Table } from '@chakra-ui/react';

// Components
import { ActionCell } from '@/ui/components';

// mock
import { MOCK_USER_DETAIL, TRANSACTIONS } from '@/lib/mocks';

const userMock = MOCK_USER_DETAIL;
const mockTransaction = TRANSACTIONS[1];
const onDeleteTransactionMock = jest.fn();
const onUpdateTransactionMock = jest.fn();
const onLockUserMock = jest.fn();
const onUnlockUserMock = jest.fn();

const setup = () =>
  render(
    <ActionCell
      user={userMock}
      transaction={mockTransaction}
      onDeleteTransaction={onDeleteTransactionMock}
      onUpdateTransaction={onUpdateTransactionMock}
      onLockUser={onLockUserMock}
      onUnlockUser={onUnlockUserMock}
    />,
    {
      wrapper: Table,
    },
  );

describe('CustomerNameCell', () => {
  it('Match to snapshot', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
