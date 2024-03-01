import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@chakra-ui/react';

// components
import { Menu } from '@/ui/components';
import { HELP_ITEM_LIST, OTHER_ITEM_LIST } from '@/lib/constants';

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

export const Expand: Story = {
  args: {
    listItem: OTHER_ITEM_LIST,
    title: 'Expand Menu Component',
  },
};

export const Minify: Story = {
  args: {
    title: 'Minify Menu Component',
    listItem: HELP_ITEM_LIST,
    isExpandSidebar: true,
  },
};
