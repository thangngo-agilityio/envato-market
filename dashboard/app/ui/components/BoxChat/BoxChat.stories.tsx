import { StoryObj, Meta } from '@storybook/react';

import BoxChat from '.';

const meta: Meta<typeof BoxChat> = {
  title: 'Custom Components/BoxChat',
  tags: ['autodocs'],
  component: BoxChat,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BoxChat>;

export const Default: Story = {
  args: {},
};
