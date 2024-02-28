import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import UserTable from '@/ui/components/UsersTable';

// Mocks
import { MOCK_USER_DETAIL, MOCK_USER_WITH_BLOCK } from '@/lib/mocks';

describe('UserTable component', () => {
  it('should renders correctly', () => {
    const { container } = render(
      <UserTable
        users={[MOCK_USER_DETAIL]}
        arrOfCurrButtons={[]}
        isDisabledPrev={true}
        isDisableNext={true}
        onChangeLimit={jest.fn()}
        onPageChange={jest.fn()}
        onPageClick={jest.fn()}
        onClickUser={jest.fn()}
        onLockUser={jest.fn()}
        onUnlockUser={jest.fn()}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should renders component', () => {
    render(
      <UserTable
        users={[MOCK_USER_DETAIL]}
        arrOfCurrButtons={[]}
        isDisabledPrev={true}
        isDisableNext={true}
        onChangeLimit={jest.fn()}
        onPageChange={jest.fn()}
        onPageClick={jest.fn()}
        onClickUser={jest.fn()}
        onLockUser={jest.fn()}
        onUnlockUser={jest.fn()}
      />,
    );

    expect(screen.getByText('Abdur Rohman')).toBeInTheDocument();
  });

  it('renders StatusCell correctly based on isBlock = true', () => {
    const { getByText } = render(
      <UserTable
        users={[MOCK_USER_WITH_BLOCK[0]]}
        arrOfCurrButtons={[]}
        isDisabledPrev={true}
        isDisableNext={true}
        onChangeLimit={jest.fn()}
        onPageChange={jest.fn()}
        onPageClick={jest.fn()}
        onClickUser={jest.fn()}
        onLockUser={jest.fn()}
        onUnlockUser={jest.fn()}
      />,
    );

    const unlockedUserStatusCell = getByText('Lock');

    expect(unlockedUserStatusCell).toHaveTextContent('Lock');
  });

  it('renders StatusCell correctly based on isBlock = false', () => {
    const { getByText } = render(
      <UserTable
        users={[MOCK_USER_WITH_BLOCK[1]]}
        arrOfCurrButtons={[]}
        isDisabledPrev={true}
        isDisableNext={true}
        onChangeLimit={jest.fn()}
        onPageChange={jest.fn()}
        onPageClick={jest.fn()}
        onClickUser={jest.fn()}
        onLockUser={jest.fn()}
        onUnlockUser={jest.fn()}
      />,
    );

    const unlockedUserStatusCell = getByText('Unlock');

    expect(unlockedUserStatusCell).toHaveTextContent('Unlock');
  });
});
