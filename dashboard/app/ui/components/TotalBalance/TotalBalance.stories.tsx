import { StoryObj, Meta } from '@storybook/react';

// Components
import TotalBalance from '@/ui/components/TotalBalance';

const meta: Meta<typeof TotalBalance> = {
  title: 'Custom Components/TotalBalance',
  tags: ['autodocs'],
  component: TotalBalance,
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof TotalBalance>;

export const Default: Story = {};
