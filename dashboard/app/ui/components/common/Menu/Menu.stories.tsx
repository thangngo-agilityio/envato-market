import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@chakra-ui/react';

// components
import { Menu } from '@/ui/components';

const meta: Meta<typeof Menu> = {
  title: 'Custom Components/Menu',
  tags: ['autodocs'],
  component: Menu,
  argTypes: {
    title: {
      description: 'The title of the Menu component',
    },

    listItem: {
      description: 'The list item of the menu',
    },

    isExpandSidebar: {
      description: 'Determine the mode of the menu in sidebar: expand or mini',
    },
  },
  decorators: [
    (Story) => (
      <Box bg="background.component.primary">
        <Story />
      </Box>
    ),
  ],
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const Epxand: Story = {
  args: {
    title: 'Expand Menu Component',
  },
};

export const Minify: Story = {
  args: {
    title: 'Minify Menu Component',

    isExpandSidebar: true,
  },
};
