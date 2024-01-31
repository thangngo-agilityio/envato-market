// Sections
import { ForgotPasswordSection } from '@/ui/sections';
import userEvent from '@testing-library/user-event';
import * as firebase from 'firebase/auth';

const { render, waitFor } = testLibReactUtils;

const sendPasswordResetEmailMock = jest.fn();

describe('ForgotPasswordSection render', () => {
  beforeEach(() => {
    jest
      .spyOn(firebase, 'sendPasswordResetEmail')
      .mockImplementation(sendPasswordResetEmailMock);
  });

  test('Should render match with snapshot.', () => {
    const { container } = render(<ForgotPasswordSection />);

    expect(container).toMatchSnapshot();
  });

  test('Handle submit recover password', async () => {
    const { getByPlaceholderText, getByRole } = render(
      <ForgotPasswordSection />,
    );

    const input = getByPlaceholderText('Enter your email');
    const button = getByRole('button', { name: /recover password/i });

    await userEvent.type(input, 'canhvo0603@gmail.com');
    await userEvent.click(button);

    waitFor(() => {
      expect(sendPasswordResetEmailMock).toHaveBeenCalled();
    });
  });
});
