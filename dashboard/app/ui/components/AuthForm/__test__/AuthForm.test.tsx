import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Component
import AuthForm from '@/ui/components/AuthForm';

// Constants
import { ROUTES } from '@/lib/constants';

// Hooks
import { useAuth } from '@/lib/hooks';

// Mocks
import { USER_SIGN_UP, USER_SIGN_IN } from '@/lib/mocks';

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

  it('successful register', async () => {
    render(<AuthForm isRegister />);

    await userEvent.type(screen.getByPlaceholderText('First name'), 'John');

    await userEvent.type(screen.getByPlaceholderText('Last name'), 'Doe');

    await userEvent.type(
      screen.getByPlaceholderText('Email'),
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
      expect(mockSignUp).toHaveBeenCalledWith(USER_SIGN_UP);

      expect(mockRouter.push).toHaveBeenCalledWith(ROUTES.ROOT);

      expect(mockSetError).not.toHaveBeenCalled();
    });
  });

  it('failed register', async () => {
    try {
      render(<AuthForm isRegister />);

      await userEvent.type(screen.getByPlaceholderText('First name'), 'John');

      await userEvent.type(screen.getByPlaceholderText('Last name'), 'Doe');

      await userEvent.type(
        screen.getByPlaceholderText('Email'),
        'test@example.com',
      );

      await userEvent.type(screen.getByPlaceholderText('Password'), '1@Dzxcvb');

      await userEvent.type(
        screen.getByPlaceholderText('Confirm password'),
        'Abcd@1234',
      );

      await userEvent.click(
        screen.getByText(/By creating an account, you're agreeing to our /i),
      );

      await userEvent.click(screen.getByRole('button', { name: 'Sign Up' }));
    } catch (error) {
      await waitFor(() => {
        expect(mockRouter.push).toHaveBeenCalledWith(ROUTES.REGISTER);

        expect(mockSetError).toHaveBeenCalled();
      });
    }
  });

  it('failed login', async () => {
    try {
      render(<AuthForm />);

      await userEvent.type(
        screen.getByPlaceholderText('Email'),
        'test@example.com',
      );
      await userEvent.type(
        screen.getByPlaceholderText('Password'),
        'Abcd@1234',
      );

      await userEvent.click(screen.getByRole('button', { name: 'Sign In' }));
    } catch (error) {
      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalledWith(
          {
            ...USER_SIGN_IN,
          },
          false,
        );

        expect(mockRouter.push).toHaveBeenCalledWith(ROUTES.LOGIN);

        expect(screen.getAllByLabelText).toEqual(
          'Email or password is incorrect',
        );

        expect(mockSetError).toHaveBeenCalled();
      });
    }
  });

  it('Wrong format email', async () => {
    try {
      render(<AuthForm />);

      await userEvent.type(
        screen.getByPlaceholderText('Email'),
        'testexample.com',
      );

      await userEvent.click(screen.getByRole('button', { name: 'Sign In' }));
    } catch (error) {
      await waitFor(() => {
        expect(screen.getAllByLabelText).toEqual('Email is invalid');
      });
    }
  });

  it('Wrong format password', async () => {
    try {
      render(<AuthForm />);

      await userEvent.type(
        screen.getByPlaceholderText('Email'),
        'test@example.com',
      );
      await userEvent.type(screen.getByPlaceholderText('Password'), '111111');

      await userEvent.click(screen.getByRole('button', { name: 'Sign In' }));
    } catch (error) {
      await waitFor(() => {
        expect(screen.getAllByLabelText).toEqual(
          'Password contains uppercase, lowercase and special characters',
        );
        expect(screen.getAllByLabelText).toEqual(
          'Password must be more than 8 characters',
        );
      });
    }
  });

  it('Haven`t entered email yet', async () => {
    try {
      render(<AuthForm />);

      await userEvent.type(screen.getByPlaceholderText('Email'), '');
      await userEvent.type(screen.getByPlaceholderText('Password'), '111111');
    } catch (error) {
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Sign In' })).toHaveAttribute(
          'disabled',
        );
      });
    }
  });

  it('Haven`t entered password yet', async () => {
    try {
      render(<AuthForm />);

      await userEvent.type(
        screen.getByPlaceholderText('Email'),
        'test@example.com',
      );
      await userEvent.type(screen.getByPlaceholderText('Password'), '');
    } catch (error) {
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Sign In' })).toHaveAttribute(
          'disabled',
        );
      });
    }
  });

  it('Haven`t entered confirm password yet', async () => {
    try {
      render(<AuthForm isRegister />);

      await userEvent.type(
        screen.getByPlaceholderText('Email'),
        'test@example.com',
      );
      await userEvent.type(screen.getByPlaceholderText('Password'), '12345');

      await userEvent.type(screen.getByPlaceholderText('Confirm password'), '');
    } catch (error) {
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Sign Up' })).toHaveAttribute(
          'disabled',
        );
      });
    }
  });

  it('Haven`t entered First name yet', async () => {
    try {
      render(<AuthForm isRegister />);

      await userEvent.type(screen.getByPlaceholderText('First name'), '');
    } catch (error) {
      expect(screen.getByRole('button', { name: 'Sign Up' })).toHaveAttribute(
        'disabled',
      );
    }
  });

  it('Haven`t entered Last name yet', async () => {
    try {
      render(<AuthForm isRegister />);

      await userEvent.type(screen.getByPlaceholderText('Last name'), '');
    } catch (error) {
      expect(screen.getByRole('button', { name: 'Sign Up' })).toHaveAttribute(
        'disabled',
      );
    }
  });

  it('Should render message when Email already exists', async () => {
    try {
      render(<AuthForm isRegister />);

      await userEvent.type(screen.getByPlaceholderText('First name'), 'John');

      await userEvent.type(screen.getByPlaceholderText('Last name'), 'Doe');

      await userEvent.type(
        screen.getByPlaceholderText('Email'),
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
    } catch (error) {
      await waitFor(() => {
        expect(mockRouter.push).toHaveBeenCalledWith(ROUTES.REGISTER);

        expect(screen.getAllByLabelText).toEqual('Email already exists');

        expect(mockSetError).toHaveBeenCalled();
      });
    }
  });

  it('Password does not match', async () => {
    try {
      render(<AuthForm isRegister />);

      await userEvent.type(screen.getByPlaceholderText('First name'), 'John');

      await userEvent.type(screen.getByPlaceholderText('Last name'), 'Doe');

      await userEvent.type(
        screen.getByPlaceholderText('Email'),
        'test@example.com',
      );

      await userEvent.type(screen.getByPlaceholderText('Password'), '1@Dzxcvb');

      await userEvent.type(
        screen.getByPlaceholderText('Confirm password'),
        'Abcd@1234',
      );

      await userEvent.click(
        screen.getByText(/By creating an account, you're agreeing to our /i),
      );

      await userEvent.click(screen.getByRole('button', { name: 'Sign Up' }));
    } catch (error) {
      await waitFor(() => {
        expect(mockRouter.push).toHaveBeenCalledWith(ROUTES.REGISTER);

        expect(screen.getAllByLabelText).toEqual('Password does not match');
      });
    }
  });
});
