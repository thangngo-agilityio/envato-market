import { StoryObj, Meta } from '@storybook/react';

// Components
import { InputSendMessages } from '@/ui/components';

const meta: Meta<typeof InputSendMessages> = {
  title: 'Custom Components/InputSendMessages',
  component: InputSendMessages,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof InputSendMessages>;

export const Default: Story = {
  args: {},
};
