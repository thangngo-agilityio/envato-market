import { Box, Button, Center } from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';

// Constants
import { IMAGES } from './lib/constants';

// Utils
import { generatePlaceholder } from './lib/utils';

const NotFound = () => (
  <Center flexDirection="column-reverse">
    <Box w={1276} h={858}>
      <Image
        src={IMAGES.NOT_FOUND.url}
        alt={IMAGES.NOT_FOUND.alt}
        fill
        sizes="100vw"
        placeholder="blur"
        blurDataURL={generatePlaceholder(1276, 858)}
      />
    </Box>
    <Button
      as={Link}
      aria-labelledby="go back"
      aria-label="btn-go-back"
      href="/"
      _hover={{ bg: 'gray.600' }}
      px={10}
      py={3}
      mt={10}
      ml={10}
      fontSize="sm"
      width="fit-content"
      alignSelf="flex-start"
    >
      Go Back
    </Button>
  </Center>
);
export default NotFound;
