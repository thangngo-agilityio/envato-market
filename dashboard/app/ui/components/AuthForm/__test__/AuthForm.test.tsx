import { render, screen } from '@testing-library/react';

// Component
import AuthForm from '@/ui/components/AuthForm';
import userEvent from '@testing-library/user-event';
import { ROUTES } from '@/lib/constants';
import { useAuth } from '@/lib/hooks';

const mockSignIn = jest.fn();
const mockSignUp = jest.fn();
const mockRouter = { push: jest.fn() };
const mockSetError = jest.fn();

jest.mock('@/lib/hooks', () => ({
  ...jest.requireActual('@/lib/hooks'),
  useAuth: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => mockRouter,
}));

const userSignIn = {
  email: 'test@example.com',
  password: '1@Dzxcvb',
  fcmToken: '',
};

const userSignUp = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'test@example.com',
  password: '1@Dzxcvb',
  fcmToken: '',
};

describe('AuthForm components', () => {
  beforeAll(() => {
    (useAuth as jest.Mock).mockReturnValue({
      signIn: mockSignIn,
      signUp: mockSignUp,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

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

  it('successful login', async () => {
    render(<AuthForm />);

    await userEvent.type(
      screen.getByPlaceholderText('Username or email'),
      'test@example.com',
    );
    await userEvent.type(screen.getByPlaceholderText('Password'), '1@Dzxcvb');

    await userEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith(
        {
          ...userSignIn,
        },
        false,
      );

      expect(mockRouter.push).toHaveBeenCalledWith(ROUTES.ROOT);

      expect(mockSetError).not.toHaveBeenCalled();
    });
  });

  it('successful register', async () => {
    render(<AuthForm isRegister />);

    await userEvent.type(screen.getByPlaceholderText('First name'), 'John');

    await userEvent.type(screen.getByPlaceholderText('Last name'), 'Doe');

    await userEvent.type(
      screen.getByPlaceholderText('Username or email'),
      'test@example.com',
    );

    await userEvent.type(screen.getByPlaceholderText('Password'), '1@Dzxcvb');

    await userEvent.type(
      screen.getByPlaceholderText('Confirm password'),
      '1@Dzxcvb',
    );

    await userEvent.click(
      screen.getByText(/By creating an account, you're agreeing to our /i),
    );

    await userEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith(userSignUp);

      expect(mockRouter.push).toHaveBeenCalledWith(ROUTES.ROOT);

      expect(mockSetError).not.toHaveBeenCalled();
    });
  });
});
