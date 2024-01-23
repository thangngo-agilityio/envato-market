'use client';

import Link from 'next/link';
import { memo } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

// Assets
import { Avatar } from '@/ui/components';

// Constants
import { IMAGES, ROUTES } from '@/lib/constants';

interface DropdownProps {
  src?: string;
  name?: string;
  alt?: string;
  permission?: string;
}

const UserDropdownMenu = ({
  src = IMAGES.USER.url,
  name = '',
  alt = '',
  permission = '',
}: DropdownProps) => (
  <Flex as={Link} href={`/${ROUTES.SETTING}`} alignItems="center">
    <Avatar src={src} alt={alt} />
    <Box display={{ base: 'none', '3xl': 'inline' }}>
      <Flex flexDirection="column" alignItems="start" ml={18}>
        <Flex alignItems="center">
          <Text
            mr="15px"
            w={68}
            fontWeight="bold"
            variant="text5Xl"
            whiteSpace="break-spaces"
            noOfLines={1}
          >
            {name}
          </Text>
        </Flex>
        <Text fontSize="sm" w={20} color="text.secondary" variant="text5Xl">
          {permission}
        </Text>
      </Flex>
    </Box>
  </Flex>
);

const Dropdown = memo(UserDropdownMenu);

export default Dropdown;
