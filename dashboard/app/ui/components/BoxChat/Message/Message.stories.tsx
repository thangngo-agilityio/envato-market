import { StoryObj, Meta } from '@storybook/react';

// Constants
import { IMAGES } from '@/lib/constants';

// Components
import Message from '.';

const meta: Meta<typeof Message> = {
  title: 'Custom Components/Message',
  component: Message,
  tags: ['autodocs'],
  argTypes: {
    content: {
      description: 'The message content',
    },

    avatarUser: {
      description: 'The URL of the message avatar ',
    },

    avatarAdmin: {
      description: 'The URL of the message avatar ',
    },

    localeTime: {
      description: 'Indicate the time of the message',
    },
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Message>;

export const Default: Story = {
  args: {
    content: 'This is message',
    avatarAdmin: IMAGES.USER_AVATAR.url,
    avatarUser: IMAGES.USER_AVATAR.url,
  },
};
