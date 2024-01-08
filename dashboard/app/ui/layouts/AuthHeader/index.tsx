import { Heading as HeadingChakra, Text, VStack } from '@chakra-ui/react';
import { memo } from 'react';

type THeadingProps = {
  title: string;
};

const AuthHeaderComponent = ({ title }: THeadingProps): JSX.Element => (
  <VStack as="header">
    <HeadingChakra
      as="h1"
      fontSize="4xl"
      fontFamily="secondary"
      fontWeight="semibold"
      textAlign="center"
    >
      {title}
    </HeadingChakra>
    <Text fontSize="md" color="text.secondary" fontWeight="medium">
      Send, spend and save smarter
    </Text>
  </VStack>
);

const Heading = memo(AuthHeaderComponent);

export default Heading;
