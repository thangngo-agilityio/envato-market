import { StoryObj, Meta } from '@storybook/react';

// Components
import { Indicator } from '@/ui/components';

const meta: Meta<typeof Indicator> = {
  title: 'Custom Components/Indicator',
  component: Indicator,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Indicator>;

export const Default: Story = {
  args: {
    isOpen: true,
  },
};
