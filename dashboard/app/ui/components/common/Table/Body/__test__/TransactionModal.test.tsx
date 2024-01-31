import { render, screen, fireEvent } from '@testing-library/react';
import { TransactionModal } from '..';
import userEvent from '@testing-library/user-event';

describe('Transaction Modal', () => {
  const mockTransaction = {
    id: '123',
    customer: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'doe@gmail.com',
      avatar: '',
      address: {
        street: '123 Main St',
        state: 'CA',
        city: 'City',
        zip: 12345,
      },
    },
  };

  it('match to snapshot', () => {
    const { container } = render(
      <TransactionModal isDelete transaction={mockTransaction} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render delete confirmation correctly', async () => {
    render(<TransactionModal isDelete transaction={mockTransaction} />);

    // Ensure delete confirmation message is rendered
    expect(
      screen.getByText(/Are you sure delete the transaction with id/i),
    ).toBeInTheDocument();
  });

  it('should call onDeleteTransaction on delete button click', async () => {
    const mockOnDeleteTransaction = jest.fn();
    render(
      <TransactionModal
        isDelete
        transaction={mockTransaction}
        onDeleteTransaction={mockOnDeleteTransaction}
      />,
    );

    // Click the delete button
    fireEvent.click(screen.getByText('Delete'));

    // Ensure onDeleteTransaction is called
    expect(mockOnDeleteTransaction).toHaveBeenCalled();
  });

  it('should call onCloseModal on cancel button click', async () => {
    const mockOnCloseModal = jest.fn();
    render(
      <TransactionModal
        isDelete
        transaction={mockTransaction}
        onCloseModal={mockOnCloseModal}
      />,
    );

    // Click the cancel button
    fireEvent.click(screen.getByText('Cancel'));

    // Ensure onCloseModal is called
    expect(mockOnCloseModal).toHaveBeenCalled();
  });

  it('should call onUpdateTransaction and reset form on form submission', async () => {
    const mockOnUpdateTransaction = jest.fn();
    const mockOnCloseModal = jest.fn();

    render(
      <TransactionModal
        transaction={mockTransaction}
        onUpdateTransaction={mockOnUpdateTransaction}
        onCloseModal={mockOnCloseModal}
        isDelete={true}
      />,
    );

    // Simulate user input
    userEvent.type(
      screen.getByLabelText<HTMLInputElement>('First Name'),
      ' Updated',
    );

    // Submit the form
    fireEvent.click(screen.getByText('Save'));

    // Ensure onUpdateTransaction is called with the updated data
    expect(mockOnUpdateTransaction).toHaveBeenCalledWith({
      ...mockTransaction,
      customer: {
        ...mockTransaction.customer,
        firstName: 'John Updated',
      },
    });

    // Ensure reset is called with the updated data
    expect(mockOnCloseModal).toHaveBeenCalled();
  });
});
