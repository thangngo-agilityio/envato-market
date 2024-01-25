import { StoryObj, Meta } from '@storybook/react';
import { Box } from '@chakra-ui/react';

// Components
import FaqItem from '@/ui/components/Setting/Faq/FaqItem';

const meta: Meta<typeof FaqItem> = {
  title: 'Custom Components/FaqItem',
  tags: ['autodocs'],
  component: FaqItem,
  argTypes: {
    question: {
      description: 'This is content of question',
    },

    answer: {
      description: 'This is content of answer',
    },
  },
  decorators: [
    (Story) => (
      <Box bg="background.component.primary">
        <Story />
      </Box>
    ),
  ],
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

type Story = StoryObj<typeof FaqItem>;

export const Default: Story = {
  args: {
    question: 'Question content',
    answer: 'Answer content',
  },
};

export default meta;
