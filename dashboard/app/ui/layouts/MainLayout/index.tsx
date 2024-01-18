'use client';

// import dynamic from 'next/dynamic';
import { SIDEBAR } from '@/lib/constants';
import { Box, Flex, useDisclosure, useMediaQuery } from '@chakra-ui/react';

// Component
import { Header, SideBar } from '@/ui/layouts';
import { CheckPinCodeProvider } from '@/ui/providers';
import { useEffect } from 'react';
// const SideBar = dynamic(() => import('@/ui/layouts/Sidebar'));

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isDesktop] = useMediaQuery('(min-width: 1732px)');
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
