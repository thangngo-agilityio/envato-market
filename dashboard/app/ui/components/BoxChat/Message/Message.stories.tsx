import { StoryObj, Meta } from '@storybook/react';

// Constants
import { AVATAR_POSITION, IMAGES } from '@/lib/constants';

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

    avatar: {
      description: 'The URL of the message avatar ',
    },

    isImage: {
      description:
        'Indicate the type of the message is image URL to render image',
    },

    avatarPosition: {
      description:
        'Determine whether the position of the avatar is before or after',

      defaultValue: AVATAR_POSITION.BEFORE,
    },

    isOwnerMessage: {
      description: 'Indicate the position of the user message',

      defaultValue: false,
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
    avatar: IMAGES.USER_AVATAR.url,
    isImage: true,
    avatarPosition: AVATAR_POSITION.BEFORE,
    isOwnerMessage: true,
  },
};
