import { StoryObj, Meta } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import { TotalStatisticList } from '@/ui/components';

// Mocks
import { SPENDING_STATISTICS_MOCK } from '@/lib/mocks';

const queryClient = new QueryClient();

const meta: Meta<typeof TotalStatisticList> = {
  title: 'Custom Components/TotalStatisticList',
  tags: ['autodocs'],
  component: TotalStatisticList,
  argTypes: {
    data: {
      description: 'The list of total card to display',
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
type Story = StoryObj<typeof TotalStatisticList>;

export const Default: Story = {
  args: {
    data: SPENDING_STATISTICS_MOCK,
  },
};
