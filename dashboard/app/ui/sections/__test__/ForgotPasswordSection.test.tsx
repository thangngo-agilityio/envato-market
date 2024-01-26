// Sections
import { ForgotPasswordSection } from '@/ui/sections';

const { render } = testLibReactUtils;

describe('ForgotPasswordSection render', () => {
  test('Should render match with snapshot.', () => {
    const { container } = render(<ForgotPasswordSection />);

    expect(container).toMatchSnapshot();
  });
});
