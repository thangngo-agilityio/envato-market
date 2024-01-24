'use client';

import { useEffect } from 'react';
import { Box, Flex, useDisclosure, useMediaQuery } from '@chakra-ui/react';

// Constants
import { SCREEN_SIZES, SIDEBAR } from '@/lib/constants';

// Component
import { Header, SideBar } from '@/ui/layouts';

// Provider
import { CheckPinCodeProvider } from '@/ui/providers';

// Stores
import { TAuthStoreData, authStore } from '@/lib/stores';

// Interfaces
import { TUserDetail } from '@/lib/interfaces';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isDesktop] = useMediaQuery(SCREEN_SIZES.LARGE_DESKTOP);
  const {
    isOpen: isExpandSidebar,
    onOpen,
    onClose,
  } = useDisclosure({
    defaultIsOpen: false,
  });

  const user = authStore((state): TAuthStoreData['user'] => state.user);

  useEffect(() => {
    if (isDesktop) {
      onOpen();
    }
  }, [isDesktop, onOpen]);

  return (
    <CheckPinCodeProvider>
      <Flex w="full" h="full" bg="background.body.primary">
        <Box
          pl={{
            base: 0,
            md: SIDEBAR.MINI_SIDEBAR_WIDTH,
            lg: SIDEBAR.MINI_SIDEBAR_WIDTH,
            '4xl': isExpandSidebar
              ? SIDEBAR.EXPAND_SIDEBAR_WIDTH
              : isDesktop
                ? SIDEBAR.MINI_SIDEBAR_WIDTH
                : 0,
          }}
          w="full"
          minH="100vh"
          h="full"
          sx={{
            transition: 'all .25s ease-in-out',
          }}
        >
          <SideBar
            isExpandSidebar={isExpandSidebar}
            user={user as TUserDetail}
            onOpen={onOpen}
            onClose={onClose}
          />
          <Header />
          {children}
        </Box>
      </Flex>
    </CheckPinCodeProvider>
  );
};

export default MainLayout;
