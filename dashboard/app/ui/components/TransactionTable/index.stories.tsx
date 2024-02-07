import { StoryObj, Meta } from '@storybook/react';
import { Box } from '@chakra-ui/react';

// Component
import FilterUser from '@/ui/components/TransactionTable';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const meta: Meta<typeof FilterUser> = {
  title: 'Custom Components/FilterUser',
  tags: ['autodocs'],
  component: FilterUser,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Box
          bgColor="background.component.primary"
          borderRadius={8}
          px={6}
          py={5}
        >
          <Story />
        </Box>
      </QueryClientProvider>
    ),
  ],
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof FilterUser>;

export const Default: Story = {
  args: {},
};
