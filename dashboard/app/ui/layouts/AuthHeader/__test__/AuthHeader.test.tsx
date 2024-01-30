import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// component
import { AuthHeader } from '../..';

const mockProps = {
  title: 'Something',
};

describe('AuthHeader component render', () => {
  it('Should render match with snapshot.', () => {
    const renderComponent = () => render(<AuthHeader {...mockProps} />);
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });

  it('renders additional text when pathName is not /forgot-password', () => {
    const { getByText } = render(
      <AuthHeader {...mockProps} pathName="/some/path" />,
    );

    // Assert that the additional text is rendered
    const additionalTextElement = getByText('Send, spend and save smarter', {
      exact: false,
    });
    expect(additionalTextElement).toBeInTheDocument();
  });

  it('does not render additional text when pathName is /forgot-password', () => {
    const { queryByText } = render(
      <AuthHeader {...mockProps} pathName="/forgot-password" />,
    );

    // Assert that the additional text is not rendered with /forgot-password pathName
    const additionalTextElement = queryByText('Send, spend and save smarter', {
      exact: false,
    });
    expect(additionalTextElement).toBeNull();
  });
});
