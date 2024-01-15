import { Modal } from '@/ui/components';
import { render } from '@testing-library/react';

// Components

describe('Modal test cases', () => {
  const mockOnClose = jest.fn();

  const mockRenderBody = <></>;

  const setup = () =>
    render(
      <Modal
        isOpen={true}
        onClose={mockOnClose}
        body={mockRenderBody}
        title="mock title"
      />,
    );

  it('should render correctly', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('should render with default value', () => {
    const { container } = render(<Modal isOpen={true} onClose={mockOnClose} />);

    expect(container).toMatchSnapshot();
  });
});
