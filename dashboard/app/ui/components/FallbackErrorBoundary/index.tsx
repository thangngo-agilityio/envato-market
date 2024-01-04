import { Text, VStack } from '@chakra-ui/react';
import { memo } from 'react';
import isEqual from 'react-fast-compare';

const ErrorComponent = ({ error }: { error: Error }): JSX.Element => (
  <VStack justifyContent="center" minH="calc(100vh - 200px)">
    <Text
      fontSize="lg"
      fontWeight="bold"
      color="text.primary"
      data-testid="error-title"
    >
      An error has been occurred!!
    </Text>
    <Text
      fontSize="3xl"
      fontWeight="bold"
      color="danger.400"
      data-testid="error-message"
    >
      {error?.message}
    </Text>
  </VStack>
);

const FallbackErrorBoundary = memo(ErrorComponent, isEqual);

export default FallbackErrorBoundary;
