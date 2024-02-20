import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Select } from '@/ui/components';

// Mocks
import { SOCIAL_PLATFORM_OPTIONS } from '@/lib/constants';

const meta: Meta<typeof Select> = {
  title: 'Custom Components/Select',
  tags: ['autodocs'],
  component: Select,
  argTypes: {
    options: {
      description: 'The option list for the Select',
    },

    variant: {
      description: 'The variant of the Select',
    },

    size: {
      description:
        'The size of the Select. Currently there are two sizes: sm, md.',
    },

    onSelect: {
      description: 'The function to call when selecting options',
    },
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Primary: Story = {
  args: {
    options: SOCIAL_PLATFORM_OPTIONS,
  },
};
