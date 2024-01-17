import { Box, MenuList, Text } from '@chakra-ui/react';
import { memo } from 'react';

export type TBonusContentProps = {
  discount: number;
};

const BonusContentMenuList = ({ discount }: TBonusContentProps) => (
  <MenuList
    bg="background.component.primary"
    position="relative"
    p={6}
    border="none"
    minW={320}
    maxW={330}
  >
    <Box position="relative" w="full" p={5} bg="primary.600" borderRadius="lg">
      <Text
        textAlign="center"
        as="h3"
        color="white"
        fontSize={28}
        fontWeight="bold"
      >
        {discount}% Bonus
      </Text>
      <Text
        textAlign="center"
        px={5}
        fontSize="lg"
        lineHeight={6}
        color="primary.900"
      >
        Create an Account and Get Bonus
      </Text>
      <Box
        position="absolute"
        borderRadius="lg"
        top="5px"
        left="10px"
        bg="primary.800"
        h={132}
        w="calc(100% - 20px)"
        zIndex={-1}
      />
    </Box>
  </MenuList>
);

const BonusContent = memo(BonusContentMenuList);
export default BonusContent;
