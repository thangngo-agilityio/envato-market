import '@testing-library/jest-dom';

// component
import { Benefit } from '@/ui/components';

// Constants
import { ROUTES } from '@/lib/constants';

const { render } = testLibReactUtils;

describe('Benefit render', () => {
  test('renders Benefit with pathName is Login', () => {
    const { container } = render(<Benefit pathName={`/${ROUTES.LOGIN}`} />);

    expect(container).toMatchSnapshot();
  });

  test('renders Benefit with pathName is SignUp', () => {
    const { container } = render(<Benefit pathName={`/${ROUTES.REGISTER}`} />);

    expect(container).toMatchSnapshot();
  });
});
