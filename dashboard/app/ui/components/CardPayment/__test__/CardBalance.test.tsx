import '@testing-library/jest-dom';
import CardBalance from '../CardBalance';

describe('CardPayment test cases', () => {
  test('CardPayment component renders correctly', () => {
    const { container } = render(<CardBalance balance={0} />);

    expect(container).toMatchSnapshot();
  });
});
