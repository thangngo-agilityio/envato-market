import type { Meta, StoryObj } from '@storybook/react';
import { Box, Text } from '@chakra-ui/react';

// Components
import Modal from '.';

const meta: Meta<typeof Modal> = {
  title: 'Custom Components/Modal',
  component: Modal,
  argTypes: {
    isOpen: {
      description: 'Determine the state of the Modal',
      defaultValue: true,
    },
    onClose: {
      description: 'The function that handles the close event of the Modal',
      action: 'onClose',
    },

    title: {
      description: 'The title of the Modal',
    },
    body: {
      description: 'The function that render the UI body of the Modal',
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

export default meta;

type Story = StoryObj<typeof Modal>;

export const Primary: Story = {
  args: {
    title: 'Title',
    isOpen: true,
    body: <Text>Sample Modal</Text>,
  },
};
