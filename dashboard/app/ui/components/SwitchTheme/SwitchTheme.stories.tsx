import { StoryObj, Meta } from '@storybook/react';
import { Box } from '@chakra-ui/react';

// Components
import SwitchTheme from '.';

const meta: Meta<typeof SwitchTheme> = {
  title: 'Custom Components/SwitchTheme',
  tags: ['autodocs'],
  component: SwitchTheme,
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
type Story = StoryObj<typeof SwitchTheme>;

export const Default: Story = {};
