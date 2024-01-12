import { StoryObj, Meta } from '@storybook/react';

import AuthForm from '.';

const meta: Meta<typeof AuthForm> = {
  title: 'Custom Components/AuthForm',
  tags: ['autodocs'],
  component: AuthForm,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof AuthForm>;

export const Default: Story = {
  args: {},
};

export const RegisterForm: Story = {
  args: {
    isRegister: true,
  },
};
