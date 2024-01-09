import { StoryObj, Meta } from '@storybook/react';
import { Box } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

// Components
import Profile from '@/ui/components/Profile';

// Interfaces
import { TUserDetail } from '@/lib/interfaces';

const meta: Meta<typeof Profile> = {
  title: 'Custom Components/Profile',
  tags: ['autodocs'],
  component: Profile,
  argTypes: {
    control: {
      description: 'The control of form',
    },
    onUploadError: {
      description: 'The callback when upload error',
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

type Story = StoryObj<typeof Profile>;

export const Default: Story = {
  args: {
    onUploadError: () => {},
  },

  render: function Render(props) {
    const { control } = useForm<TUserDetail>();

    return <Profile {...props} control={control} />;
  },
};

export default meta;
