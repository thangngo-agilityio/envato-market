import { StoryObj, Meta } from '@storybook/react';

// Components
import { Quill } from '@/ui/components';

const meta: Meta<typeof Quill> = {
  title: 'Custom Components/Quill',
  tags: ['autodocs'],
  component: Quill,
};

type Story = StoryObj<typeof Quill>;

export const Default: Story = {
  args: {
    userUid: '1',
  },
};

export default meta;
