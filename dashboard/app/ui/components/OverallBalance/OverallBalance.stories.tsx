import { StoryObj, Meta } from '@storybook/react';

// Components
import OverallBalance from '@/ui/components/OverallBalance';

// Mocks
import { OVERALL_BALANCE_MOCK } from '@/lib/mocks';

const meta: Meta<typeof OverallBalance> = {
  title: 'Custom Components/OverallBalance',
  tags: ['autodocs'],
  component: OverallBalance,
  argTypes: {
    data: {
      description:
        'The data of the overall balance for 12 months includes: pending, signed and lost',
    },
    growth: {
      description: 'The growth amount of the overall balance',
    },
    total: {
      description: 'The total amount of the overall balance',
    },
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof OverallBalance>;

export const Default: Story = {
  args: OVERALL_BALANCE_MOCK,
};
