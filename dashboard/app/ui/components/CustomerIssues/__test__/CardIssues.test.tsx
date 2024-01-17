import { render } from '@testing-library/react';

// Components
import { CardIssues } from '@/ui/components';

// Mocks
import { ISSUES } from '@/lib/mocks';

describe('CardIssues render', () => {
  test('Should render match with snapshot.', () => {
    const { container } = render(<CardIssues data={ISSUES} />);
    expect(container).toMatchSnapshot();
  });
});
