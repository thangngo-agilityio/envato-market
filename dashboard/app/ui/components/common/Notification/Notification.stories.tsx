import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import { Box } from '@chakra-ui/react';
import Notification from '.';

const queryClient = new QueryClient();

const meta: Meta<typeof Notification> = {
  title: 'Custom Components/Notification',
  tags: ['autodocs'],
  component: Notification,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Box h="40vh" bg="background.component.primary">
          <Story />
        </Box>
      </QueryClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Notification>;

export const Default: Story = {
  args: {},
};
