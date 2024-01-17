import { render } from '@testing-library/react';

// Components
import { CardIssues } from '@app/components';

// Mocks
import { ISSUES } from '@app/mocks/issues';

describe('CardIssues render', () => {
  test('Should render match with snapshot.', () => {
    const { container } = render(<CardIssues data={ISSUES} />);
    expect(container).toMatchSnapshot();
  });
});
