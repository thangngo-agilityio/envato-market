import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StoryObj, Meta } from '@storybook/react';

// Components
import TotalBalance from '@/ui/components/TotalBalance';

const queryClient = new QueryClient();

const meta: Meta<typeof TotalBalance> = {
  title: 'Custom Components/TotalBalance',
  tags: ['autodocs'],
  component: TotalBalance,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
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
type Story = StoryObj<typeof TotalBalance>;

export const Default: Story = {};
