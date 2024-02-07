import { StoryObj, Meta } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import { RevenueFlow } from '@/ui/components';

import { REVENUE_FLOW_MOCK } from '@/lib/mocks';

const queryClient = new QueryClient();

const meta: Meta<typeof RevenueFlow> = {
  title: 'Custom Components/RevenueFlow',
  tags: ['autodocs'],
  component: RevenueFlow,
  argTypes: {
    data: {
      description:
        'The data of revenue flow for 12 months includes: pending, signed and lost',
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
type Story = StoryObj<typeof RevenueFlow>;

export const Default: Story = {
  args: {
    data: REVENUE_FLOW_MOCK,
  },
};
