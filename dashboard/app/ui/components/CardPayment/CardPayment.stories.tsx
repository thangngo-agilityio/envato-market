import { StoryObj, Meta } from '@storybook/react';

// Components
import CardPayment from '@/ui/components/CardPayment';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const meta: Meta<typeof CardPayment> = {
  title: 'Custom Components/CardPayment',
  tags: ['autodocs'],
  component: CardPayment,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  argTypes: {},
};

type Story = StoryObj<typeof CardPayment>;

export const Default: Story = {
  args: {},
};

export default meta;
