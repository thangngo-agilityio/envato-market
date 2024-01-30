import { StoryObj, Meta } from '@storybook/react';

// Components
import MessageAdmin from './index';

// Constants
import { IMAGES } from '@/lib/constants';

const meta: Meta<typeof MessageAdmin> = {
  title: 'Custom Components/MessageAdmin',
  component: MessageAdmin,
  tags: ['autodocs'],
  argTypes: {
    content: {
      description: 'This is content message of supper admin or member',
    },
    avatarUser: {
      src: IMAGES.CHAT_USER_AVATAR.url,
    },
    avatarAdmin: {
      src: IMAGES.CHAT_USER_AVATAR.url,
    },
    localeTime: {
      description: 'This is locale time message',
    },
    isSuperAdmin: {
      expanded: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof MessageAdmin>;

export const Default: Story = {
  args: {
    content: 'This is content message of supper admin or member',
    isSuperAdmin: false,
    avatarUser: IMAGES.CHAT_USER_AVATAR.url,
    avatarAdmin: IMAGES.CHAT_USER_AVATAR.url,
    localeTime: 'This is locale time message',
  },
};

export const MessageAdminCard: Story = {
  args: {
    content: 'This is content message of supper admin or member',
    isSuperAdmin: true,
  },
};
