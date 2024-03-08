import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProductModal } from '..';
import userEvent from '@testing-library/user-event';

describe('Product Modal', () => {
  const mockProduct = {
    id: '123',
    name: 'Tivi',
    price: 1111,
    stock: 11,
    imageURLs: ['image.png'],
  };

  it('match to snapshot', () => {
    const { container } = render(
      <ProductModal isDelete product={mockProduct} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render delete confirmation correctly', async () => {
    render(<ProductModal isDelete product={mockProduct} />);

    // Ensure delete confirmation message is rendered
    expect(
      screen.getByText(/Are you sure delete the product with id/i),
    ).toBeInTheDocument();
  });

  it('should call onDeleteProduct on delete button click', async () => {
    const mockOnDeleteProduct = jest.fn();
    render(
      <ProductModal
        isDelete
        product={mockProduct}
        onDeleteProduct={mockOnDeleteProduct}
      />,
    );

    // Click the delete button
    fireEvent.click(screen.getByText('Delete'));

    // Ensure onDeleteProduct is called
    expect(mockOnDeleteProduct).toHaveBeenCalled();
  });

  it('should call onCloseModal on cancel button click', async () => {
    const mockOnCloseModal = jest.fn();
    render(
      <ProductModal
        isDelete
        product={mockProduct}
        onCloseModal={mockOnCloseModal}
      />,
    );

    // Click the cancel button
    fireEvent.click(screen.getByText('Cancel'));

    waitFor(() => {
      // Ensure onCloseModal is called
      expect(mockOnCloseModal).toHaveBeenCalled();
    });
  });

  it('handleSubmitForm should update product, reset form, and close modal', async () => {
    const onUpdateProductMock = jest.fn();
    const onCloseModalMock = jest.fn();

    render(
      <ProductModal
        product={mockProduct}
        isDelete={false}
        onUpdateProduct={onUpdateProductMock}
        onCloseModal={onCloseModalMock}
      />,
    );

    const inputField = screen.getByTestId('edit-field-name');

    await fireEvent.change(inputField, { target: { value: 'NewValue' } });

    await userEvent.click(screen.getByTestId('submit-product-form'));

    // Assertions
    waitFor(() => {
      expect(onUpdateProductMock).toHaveBeenCalled();
      expect(onCloseModalMock).toHaveBeenCalled();
    });
  });
});
