import { render } from '@testing-library/react';
import BonusNotification from '..';

const setup = () => render(<BonusNotification colorFill="mock" />);
describe('BonusNotification test cases', () => {
  it('should render correctly', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
