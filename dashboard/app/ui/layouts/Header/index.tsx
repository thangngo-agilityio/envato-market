'use client';

import { memo } from 'react';
import { usePathname } from 'next/navigation';

// Components
import {
  Box,
  Flex,
  Heading,
  Text,
  theme,
  useColorModeValue,
} from '@chakra-ui/react';
import { Dropdown, IconButton, Logo, SwitchTheme } from '@/ui/components';

// Assets
import { Email } from '@/ui/components/Icons';

// Constants
import { AUTHENTICATION_ROLE, TITLES_HEADER } from '@/lib/constants';

// Components
import Notification from '@/ui/components/common/Notification';
import { TUserDetail } from '@/lib/interfaces';

interface HeaderProps {
  user: TUserDetail;
}

const HeaderComponent = ({ user }: HeaderProps) => {
  const colorFill = useColorModeValue(
    theme.colors.gray[800],
    theme.colors.white,
  );
  const pathname = usePathname();

  const name = TITLES_HEADER[`${pathname.slice(1)}`] || TITLES_HEADER.DEFAULT;

  const { firstName, lastName, role, avatarURL } = user;

  const username = `${firstName || ''} ${lastName || ''}`;
  const roles = role === AUTHENTICATION_ROLE.SUPER_ADMIN;

  return (
    <Flex
      h="100%"
      maxW="full"
      bg="background.component.primary"
      alignItems="start"
      px={{ base: 6, xl: 10 }}
      py={6}
      justifyContent="space-between"
      direction={{
        base: 'column',
        default: 'row',
      }}
    >
      <Flex
        display={{ base: 'inline-flex', md: 'none' }}
        justifyContent="space-between"
        w="full"
      >
        <Logo />
        <Box display={{ base: 'block', default: 'none' }}>
          <Dropdown
            name={username}
            role={user?.role as string}
            permission="Super Admin"
            src={avatarURL}
          />
        </Box>
      </Flex>
      <Box display={{ base: 'none', md: 'inline' }} minW={185}>
        <Heading
          as="h1"
          fontSize="3xl"
          fontFamily="primary"
          fontWeight="bold"
          color="text.primary"
        >
          {name}
        </Heading>
        <Text fontSize="sm" color="text.secondary" fontWeight="medium">
          Let’s check your update today
        </Text>
      </Box>

      <Flex
        gap={43}
        mt={{ base: 3, default: 0 }}
        alignSelf={{
          base: 'end',
          xl: 'baseline',
        }}
      >
        <Flex>
          <Flex
            minW={{ base: 325, sm: 280, md: 310 }}
            justifyContent="space-between"
          >
            <SwitchTheme />

            <Notification colorFill={colorFill} user={user} />

            <IconButton>
              <Email color={colorFill} />
            </IconButton>

            <IconButton>
              <Email color={colorFill} />
            </IconButton>

            {/* <BonusNotification colorFill={colorFill} /> */}
          </Flex>
          <Box
            display={{ base: 'none', default: 'inline-flex', md: 'none' }}
            ml={4}
          >
            <Dropdown
              name={username}
              role={user?.role as string}
              permission={roles ? AUTHENTICATION_ROLE.SUPER_ADMIN : ''}
              src={avatarURL}
            />
          </Box>
        </Flex>

        <Box
          display={{ base: 'none', md: 'inline-flex' }}
          borderLeft="1px"
          pl={43}
          borderColor="border.primary"
          height="min-content"
        >
          <Dropdown
            name={username}
            role={user?.role as string}
            permission={roles ? AUTHENTICATION_ROLE.SUPER_ADMIN : ''}
            src={avatarURL}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

const Header = memo(HeaderComponent);

export default Header;
