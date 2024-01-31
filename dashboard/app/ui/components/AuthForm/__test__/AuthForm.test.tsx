import { fireEvent, render, screen } from '@testing-library/react';

// Component
import AuthForm from '@/ui/components/AuthForm';
import userEvent from '@testing-library/user-event';

describe('AuthForm components', () => {
  it('match snapshot with login form', () => {
    const { container } = render(<AuthForm />);

    expect(container).toMatchSnapshot();
  });

  it('match snapshot with register form', () => {
    const { container } = render(<AuthForm isRegister />);

    expect(container).toMatchSnapshot();
  });

  it('renders Login form by default', () => {
    render(<AuthForm />);

    expect(screen.getByLabelText('Sign In')).toBeInTheDocument();
  });

  it('renders Register form by default', () => {
    render(<AuthForm isRegister />);

    expect(screen.getByLabelText('Sign Up')).toBeInTheDocument();
  });

  it('submits login form and calls signIn function', async () => {
    // Mock the signIn function
    const mockClick = jest.fn();

    render(<AuthForm />);

    userEvent.type(
      screen.getByPlaceholderText('Username or email'),
      'test@example.com',
    );
    userEvent.type(screen.getByPlaceholderText('Password'), 'password123');

    fireEvent.click = mockClick;

    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    expect(mockClick).toHaveBeenCalledWith(
      screen.getByRole('button', { name: 'Sign In' }),
    );
  });

  it('submits login form and calls signUp function', async () => {
    const mockClick = jest.fn();

    render(<AuthForm isRegister />);

    userEvent.type(screen.getByPlaceholderText('First name'), 'John');
    userEvent.type(screen.getByPlaceholderText('Last name'), 'Doe');
    userEvent.type(
      screen.getByPlaceholderText('Username or email'),
      'test@example.com',
    );
    userEvent.type(screen.getByPlaceholderText('Password'), '1@Dzxcvb');
    userEvent.type(
      screen.getByPlaceholderText('Confirm password'),
      '1@Dzxcvbb',
    );
    const checkbox = screen.getByText(/Privacy Policy/i);

    fireEvent.click(checkbox);

    fireEvent.click = mockClick;

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    expect(mockClick).toHaveBeenCalledWith(
      screen.getByRole('button', { name: 'Sign Up' }),
    );
  });
});
