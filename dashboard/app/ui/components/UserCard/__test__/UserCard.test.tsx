import { render } from '@testing-library/react';

// Components
import UserCard from '@/ui/components/UserCard';

// Mock
import { USER_MOCK } from '@/lib/mocks';

describe('UserCard component', () => {
  it('renders correctly', () => {
    const { container } = render(<UserCard user={USER_MOCK} />);

    expect(container).toMatchSnapshot();
  });
});
