import type { Meta, StoryObj } from '@storybook/react';
import { Box, theme, useColorModeValue } from '@chakra-ui/react';

// Components
import BonusNotification from '.';

const meta: Meta<typeof BonusNotification> = {
  title: 'Custom Components/BonusNotification',
  tags: ['autodocs'],
  component: BonusNotification,
  argTypes: {
    colorFill: {
      description: 'The color fill of the bonus notification icon',
    },
    discount: {
      description: 'The discount percentage for the bonus notification',
    },
    isExpired: {
      description: 'Determine whether the bonus notification is expired or not',
      defaultValue: false,
    },
    limitOfBonus: {
      description: 'Determine the current number of bonus notifications limit',
      defaultValue: 5,
    },
  },
  decorators: [
    (Story) => (
      <Box h="20vh" bg="background.component.primary">
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

type Story = StoryObj<typeof BonusNotification>;

export const Primary: Story = {
  args: {
    isExpired: false,
    limitOfBonus: 5,
  },
  render: function Render(props) {
    const colorFill = useColorModeValue(
      theme.colors.gray[800],
      theme.colors.white,
    );

    return <BonusNotification {...props} colorFill={colorFill} />;
  },
};
