import type { Meta, StoryObj } from '@storybook/react';
import { theme } from '@chakra-ui/react';

// Components
import {
  IconButton,
  LightTheme,
  DarkTheme,
  Email as EmailIcon,
} from '@/ui/components';

const meta: Meta<typeof IconButton> = {
  title: 'Custom Components/IconButton',
  tags: ['autodocs'],
  component: IconButton,
  argTypes: {
    children: {
      description:
        'The children of the IconButton, e.g. text, react components, etc.',
    },

    hasNewNotification: {
      description:
        'Indicates that the IconButton has a new notification and display a red dot in the top right corner',
    },
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    children: <LightTheme color={`${theme.colors.gray[800]}`} />,
  },
};

export const Notification: Story = {
  args: {
    children: <DarkTheme color={`${theme.colors.gray[800]}`} />,
  },
};

export const Email: Story = {
  args: {
    children: <EmailIcon color={`${theme.colors.gray[800]}`} />,
    hasNewNotification: true,
  },
};
