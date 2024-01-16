import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Box } from '@chakra-ui/react';
import Notification from '.';

const meta: Meta<typeof Notification> = {
  title: 'Custom Components/Notification',
  tags: ['autodocs'],
  component: Notification,
  decorators: [
    (Story) => (
      <Box h="40vh" bg="background.component.primary">
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Notification>;

export const Default: Story = {
  args: {},
};
