import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Benefit } from '@/ui/components';

const meta: Meta<typeof Benefit> = {
  title: 'Custom Components/Benefit',
  tags: ['autodocs'],
  component: Benefit,
  argTypes: {},
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Benefit>;

export const Default: Story = {};
