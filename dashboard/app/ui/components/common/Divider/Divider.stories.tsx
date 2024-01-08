import { StoryObj, Meta } from '@storybook/react';

// Components
import Divider from '@/ui/components/common/Divider';

const meta: Meta<typeof Divider> = {
  title: 'Custom Components/Divider',
  tags: ['autodocs'],
  component: Divider,
  argTypes: {
    content: {
      description: 'Content of the divider texts field',
    },
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  args: {
    content: 'Divider Content Text',
  },
};

export default meta;
