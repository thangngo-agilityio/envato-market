import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Avatar } from '@/ui/components';

const meta: Meta<typeof Avatar> = {
  title: 'Custom Components/Avatar',
  tags: ['autodocs'],
  component: Avatar,
  argTypes: {
    src: {
      description: 'The image url to the avatar',
    },
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    src: 'https://i.ibb.co/k0mcgm3/inkshadow-yasuo-prestige-skin-lol-splash-art-4k-wallpaper-uhdpaper-com-475-1-k.jpg',
  },
};
