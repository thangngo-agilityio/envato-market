import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import { SwitchTheme } from '@/ui/components';

// Mocking Chakra UI useColorMode hook
const useColorModeMock = jest.fn();

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useColorMode: () => useColorModeMock,
}));

describe('SwitchTheme component', () => {
  const toggleColorModeMock = jest.fn();
  const colorMode = 'light';

  beforeEach(() => {
    useColorModeMock.mockReturnValue({
      colorMode,
      toggleColorMode: toggleColorModeMock,
    });
  });

  it('renders correctly', () => {
    const { container } = render(<SwitchTheme />);

    expect(container).toMatchSnapshot();
  });

  it('calls toggleColorMode when IconButton is clicked', () => {
    const { getByTestId } = render(<SwitchTheme />);
    const iconButton = getByTestId('icon-button-component');

    userEvent.click(iconButton);
    waitFor(() => {
      expect(toggleColorModeMock).toHaveBeenCalled();
    });
  });
});
