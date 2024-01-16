'use client';

import { Fragment, memo } from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  theme,
  useColorModeValue,
} from '@chakra-ui/react';

// Assets
import { Arrow, Avatar } from '@/ui/components';

// Constants
import {
  AUTHENTICATION_ROLE,
  IMAGES,
  MENU_LIST,
  MENU_LIST_ICON,
} from '@/lib/constants';

// Hooks
import { useAuth } from '@/lib/hooks';

interface DropdownProps {
  src?: string;
  role: string;
  name?: string;
  alt?: string;
  permission?: string;
  offsetX?: number;
  offsetY?: number;
}

const UserDropdownMenu = ({
  src = IMAGES.USER.url,
  name = '',
  role,
  alt = '',
  permission = '',
  offsetX = 0,
  offsetY = 10,
}: DropdownProps) => {
  const { signOut } = useAuth();
  const colorFill = useColorModeValue(
    theme.colors.gray[800],
    theme.colors.white,
  );

  return (
    <Menu offset={[offsetX, offsetY]}>
      {({ isOpen }) => (
        <Box>
          <MenuButton
            as={Button}
            p={0}
            bg="none"
            _hover={{
              bg: 'none',
            }}
            _active={{
              bg: 'none',
            }}
            isActive={isOpen}
          >
            <Flex alignItems="center">
              <Avatar src={src} alt={alt} />
              <Box display={{ base: 'none', '3xl': 'inline' }}>
                <Flex flexDirection="column" alignItems="start" ml={18}>
                  <Flex alignItems="center">
                    <Text mr="15px" w={68} fontWeight="bold" variant="text5Xl">
                      {name}
                    </Text>
                    <Arrow color={colorFill} />
                  </Flex>
                  <Text
                    fontSize="sm"
                    w={20}
                    color="text.secondary"
                    variant="text5Xl"
                  >
                    {permission}
                  </Text>
                </Flex>
              </Box>
            </Flex>
          </MenuButton>
          <MenuList
            data-testid="TestDropdown"
            position="relative"
            zIndex={2}
            px={3}
            py={2}
            mt={{ md: 4 }}
            w={300}
            border="none"
            borderRadius="lg"
            bg="background.component.primary"
          >
            {MENU_LIST_ICON.map(({ id, href, icon, value }) => {
              const Icon = icon || Fragment;
              return (
                <MenuItem
                  key={id}
                  as={Link}
                  href={href}
                  p={3.5}
                  aria-label={`menu-icon-${value}`}
                  borderRadius="lg"
                  bg="transparent"
                  _hover={{
                    bg: 'background.component.tertiary',
                    color: 'text.currencyColor',
                    svg: { stroke: 'text.currencyColor' },
                    path: { stroke: 'text.currencyColor' },
                    borderColor: 'transparent',
                  }}
                  _focus={{
                    outline: 'none',
                  }}
                  {...(id === 2 && {
                    onClick: signOut,
                  })}
                >
                  <Flex>
                    <Icon color={colorFill} />
                    <Text ml={18} variant="text4Xl">
                      {value}
                    </Text>
                  </Flex>
                </MenuItem>
              );
            })}
            {role === AUTHENTICATION_ROLE.MEMBER ? null : (
              <>
                <Divider my={3.5} color="gray.300" />
                {MENU_LIST(role).map(({ id, value, href }) => (
                  <MenuItem
                    key={id}
                    p={3.5}
                    borderRadius="lg"
                    bg="transparent"
                    as={Link}
                    href={href}
                    aria-label={`menu-item-${value}`}
                    _hover={{
                      bg: 'background.component.tertiary',
                      color: 'text.currencyColor',
                      svg: { stroke: 'text.currencyColor' },
                      borderColor: 'transparent',
                    }}
                    _focus={{
                      outline: 'none',
                    }}
                  >
                    <Text variant="text4Xl">{value}</Text>
                  </MenuItem>
                ))}
              </>
            )}
          </MenuList>
        </Box>
      )}
    </Menu>
  );
};

const Dropdown = memo(UserDropdownMenu);

export default Dropdown;
