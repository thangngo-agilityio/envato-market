'use client';

import { useEffect } from 'react';
import { Box, Flex, useDisclosure, useMediaQuery } from '@chakra-ui/react';

// Constants
import { MEDIA_SCREEN, SIDEBAR } from '@/lib/constants';

// Component
import { Header, SideBar } from '@/ui/layouts';
import { CheckPinCodeProvider } from '@/ui/providers';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isDesktop] = useMediaQuery(MEDIA_SCREEN);
  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: false,
  });

  useEffect(() => {
    if (isDesktop) {
      onOpen();
    }
  }, [isDesktop, onOpen]);

  return (
    <CheckPinCodeProvider>
      <Flex w="full" h="full" bg="background.body.primary">
        <SideBar isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

        <Box
          pl={{
            base: 0,
            md: SIDEBAR.MINI_SIDEBAR_WIDTH,
            lg: SIDEBAR.MINI_SIDEBAR_WIDTH,
            '4xl': isOpen
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
          <Header />
          {children}
        </Box>
      </Flex>
    </CheckPinCodeProvider>
  );
};

export default MainLayout;
