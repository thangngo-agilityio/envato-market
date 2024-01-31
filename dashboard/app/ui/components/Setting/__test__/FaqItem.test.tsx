import { render, screen, fireEvent } from '@testing-library/react';

// Component
import FaqItem from '@/ui/components/Setting/Faq/FaqItem';

// Constants
import { FAQ_DATA } from '@/lib/constants';

test('renders question and answer correctly', () => {
  render(
    <FaqItem question={FAQ_DATA[0].question} answer={FAQ_DATA[0].answer} />,
  );

  // Assert that the question is rendered correctly
  const questionElement = screen.getByText(FAQ_DATA[0].question);
  expect(questionElement).toMatchSnapshot('question');

  // Assert that the answer is not initially visible
  const answerElement = screen.queryByText(FAQ_DATA[0].answer);
  expect(answerElement).toMatchSnapshot('answer');

  // Toggle the answer
  fireEvent.click(questionElement);

  // Assert that the answer is now visible
  const updatedAnswerElement = screen.getByText(FAQ_DATA[0].answer);
  expect(updatedAnswerElement).toMatchSnapshot('updated answer');
});
