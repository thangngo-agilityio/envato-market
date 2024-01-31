// Sections
import { AccountSection } from '@/ui/sections';

const { render } = testLibReactUtils;

const mockUsePathname = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname() {
    return mockUsePathname();
  },
}));

describe('AccountSection render', () => {
  test('Should render match with snapshot.', () => {
    const { container } = render(<AccountSection />);

    expect(container).toMatchSnapshot();
  });

  it('renders children correctly', () => {
    const { getByTestId } = render(
      <AccountSection>
        <div data-testid="test-child" />
      </AccountSection>,
    );
    expect(getByTestId('test-child')).toBeInTheDocument();
  });
});
