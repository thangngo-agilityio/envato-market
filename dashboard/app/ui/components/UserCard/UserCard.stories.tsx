import { StoryObj, Meta } from '@storybook/react';

// Components
import UserCard from '@/ui/components/UserCard';

// Mocks
import { INITIAL_USER } from '@/lib/mocks';

const meta: Meta<typeof UserCard> = {
  title: 'Custom Components/UserCard',
  tags: ['autodocs'],
  component: UserCard,
  argTypes: {
    user: {
      description: 'Information of user',
    },
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof UserCard>;

export const Default: Story = {
  args: {
    user: INITIAL_USER,
  },
};
