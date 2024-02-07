import { StoryObj, Meta } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import OverallBalance from '@/ui/components/OverallBalance';

// Mocks
import { OVERALL_BALANCE_MOCK } from '@/lib/mocks';

const queryClient = new QueryClient();

const meta: Meta<typeof OverallBalance> = {
  title: 'Custom Components/OverallBalance',
  tags: ['autodocs'],
  component: OverallBalance,
  argTypes: {
    overallBalanceData: {
      description:
        'The data of the overall balance for 12 months includes: pending, signed and lost',
    },
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof OverallBalance>;

export const Default: Story = {
  args: {
    overallBalanceData: OVERALL_BALANCE_MOCK,
  },
};
