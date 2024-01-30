import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import TermAndConditionItem from '../TermAndConditionItem';

describe('TermAndConditionItem component', () => {
  it('should renders correctly', () => {
    const { container } = render(
      <TermAndConditionItem heading="heading" content="content" />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should renders heading and content correctly', () => {
    render(<TermAndConditionItem heading="heading" content="content" />);

    // Assert that the question is rendered correctly
    const questionElement = screen.getByText('heading');
    expect(questionElement).toMatchSnapshot('heading');

    // Assert that the answer is not initially visible
    const answerElement = screen.queryByText('content');
    expect(answerElement).toMatchSnapshot('content');
  });
});
