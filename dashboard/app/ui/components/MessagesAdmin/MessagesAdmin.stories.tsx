import { StoryObj, Meta } from '@storybook/react';

// Components
import MessageAdmin from './index';

const meta: Meta<typeof MessageAdmin> = {
  title: 'Custom Components/MessageAdmin',
  component: MessageAdmin,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof MessageAdmin>;

export const Default: Story = {
  args: {
    content: 'This is a message with custom avatars',
  },
};

export const MessageAdminCard: Story = {
  args: {
    content: 'This is a message with custom avatars',
    isSuperAdmin: true,
  },
};
