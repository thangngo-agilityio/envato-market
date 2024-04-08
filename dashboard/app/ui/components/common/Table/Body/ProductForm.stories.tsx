import { Box } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Component
import ProductFormMemorized from './ProductForm';

const queryClient = new QueryClient();

const meta: Meta<typeof ProductFormMemorized> = {
  title: 'Custom Components/ProductForm',
  tags: ['autodocs'],
  component: ProductFormMemorized,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Box
          bgColor="background.component.primary"
          borderRadius={8}
          px={6}
          py={5}
        >
          <Story />
        </Box>
      </QueryClientProvider>
    ),
  ],
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProductFormMemorized>;

export const Default: Story = {
  args: {},
};
