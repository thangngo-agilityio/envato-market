import { Box, Text } from '@chakra-ui/react';

// utils
import { getCurrentYear } from '@/lib/utils/time';

const AuthFooterComponent = () => (
  <Box mt={24}>
    <Text
      mt={6}
      fontSize="sm"
      variant="textSm"
      textAlign="center"
      _dark={{ color: 'secondary.700' }}
    >
      @ {getCurrentYear()} Bankco. All Rights Reserved.
    </Text>
  </Box>
);

export default AuthFooterComponent;
