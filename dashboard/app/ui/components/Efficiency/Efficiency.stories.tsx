import { StoryObj, Meta } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Efficiency from '@/ui/components/Efficiency';

const queryClient = new QueryClient();

const meta: Meta<typeof Efficiency> = {
  title: 'Custom Components/Efficiency',
  tags: ['autodocs'],
  component: Efficiency,
  argTypes: {
    arrival: {
      description: 'Indicate the amount of arrival money',
    },

    spending: {
      description: 'Indicate the amount of spending money',
    },

    statistical: {
      description: 'The statistical data of for the chart and the statistics',
    },

    isExchangeRate: {
      description:
        'To show the exchange options instead of the statistics by default',
      defaultValue: false,
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
type Story = StoryObj<typeof Efficiency>;

export const Default: Story = {};
