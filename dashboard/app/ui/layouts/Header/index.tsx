'use client';

import { memo } from 'react';

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
import { Bell, Email, Gift } from '@/ui/components/Icons';

// hooks
import { authStore } from '@/lib/stores';
import { useStore } from '@/lib/hooks';
import { TITLES_HEADER } from '@/lib/constants';
import { usePathname } from 'next/navigation';

const HeaderComponent = () => {
  const colorFill = useColorModeValue(
    theme.colors.gray[800],
    theme.colors.white,
  );
  const pathname = usePathname();

  const name = TITLES_HEADER[`${pathname.slice(1)}`] || TITLES_HEADER.DEFAULT;

  const user = useStore(authStore, (state) => state.user);

  const username = `${user?.firstName || ''} ${user?.lastName || ''}`;
  const avatarURL = user?.avatarURL;

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
        minW="full"
        display={{ base: 'inline-flex', md: 'none' }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Logo />
        <Flex display={{ base: 'flex' }} height="min-content" gap={4}>
          <Flex
            display={{ base: 'none', default: 'inline-flex' }}
            justifyContent="end"
            w="fit-content"
            gap={3}
          >
            <SwitchTheme />

            <IconButton isNotification>
              <Bell color={colorFill} />
            </IconButton>

            <IconButton isNotification hasNewNotification>
              <Email color={colorFill} />
            </IconButton>

            <IconButton isNotification>
              <Gift color={colorFill} />
            </IconButton>
          </Flex>
          <Dropdown name="John Doe" permission="Super Admin" />
        </Flex>
      </Flex>
      <Flex
        display={{ base: 'inline-flex', default: 'none' }}
        alignSelf="end"
        w="100%"
        gap={3}
        pt={2.5}
        justifyContent={{
          base: 'space-between',
          '0.8sm': 'end',
        }}
      >
        <SwitchTheme />

        <IconButton isNotification>
          <Bell color={colorFill} />
        </IconButton>

        <IconButton isNotification hasNewNotification>
          <Email color={colorFill} />
        </IconButton>

        <IconButton isNotification>
          <Gift color={colorFill} />
        </IconButton>
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
        w={{ base: '100%', xl: 407, '3xl': 530 }}
        justifyContent={{ base: 'end', xl: 'space-between' }}
        direction={{
          base: 'column',
          xl: 'row',
        }}
        gap={4}
        pl={{
          base: 0,
          md: 5,
          lg: 24,
          xl: 0,
        }}
      >
        <Flex
          gap={43}
          alignSelf={{
            base: 'end',
            xl: 'baseline',
          }}
        >
          <Flex
            display={{ base: 'none', md: 'inline-flex' }}
            borderRight="1px"
            borderColor="border.primary"
            height="min-content"
            pr={43}
            minW={310}
            justifyContent="space-between"
          >
            <SwitchTheme />

            <IconButton isNotification>
              <Bell color={colorFill} />
            </IconButton>

            <IconButton isNotification hasNewNotification>
              <Email color={colorFill} />
            </IconButton>

            <IconButton isNotification>
              <Gift color={colorFill} />
            </IconButton>
          </Flex>

          <Box display={{ base: 'none', md: 'inline-flex' }}>
            {/* TODO: update later */}
            <Dropdown
              src={avatarURL}
              alt={username}
              name={username}
              permission="Super Admin"
            />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

const Header = memo(HeaderComponent);

export default Header;
