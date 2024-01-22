import { memo } from 'react';
import { ROUTES } from '@/lib/constants';
import { Heading as HeadingChakra, Text, VStack } from '@chakra-ui/react';

type THeadingProps = {
  title: string;
  pathName?: string;
};

const AuthHeaderComponent = ({ title, pathName }: THeadingProps) => (
  pathName && (
    <VStack as="header">
      <HeadingChakra
        as="h1"
        fontSize={{ base: '3xl', md: '4xl' }}
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
  )
);

const Heading = memo(AuthHeaderComponent);

export default Heading;
