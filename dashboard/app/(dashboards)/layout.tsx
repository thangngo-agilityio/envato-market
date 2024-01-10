'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { IMAGES, SIDEBAR, TITLES_HEADER } from '@/lib/constants';
import { Header } from '@/ui/layouts';
import {
  Box,
  Flex,
  useDisclosure,
  useMediaQuery,
  Image,
} from '@chakra-ui/react';
import { usePathname } from 'next/navigation';

const SideBar = dynamic(() => import('@/ui/layouts/Sidebar'));

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  //TODO: check sidebar render in server
  const [isOpenOverlay] = useMediaQuery('(max-width: 1732px)');
  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: isOpenOverlay,
  });

  // Open mini sidebar on tablet
  useEffect(() => {
    if (isOpenOverlay) {
      onOpen();
    }
  }, [isOpenOverlay, onOpen]);

  const pathname = usePathname();

  return (
    <Flex w="full" h="full" bg="background.body.primary">
      <Box
        pl={{
          base: 0,
          md: !isOpen ? 0 : SIDEBAR.MINI_SIDEBAR_WIDTH,
          lg: SIDEBAR.MINI_SIDEBAR_WIDTH,
          '4xl': !isOpen
            ? SIDEBAR.EXPAND_SIDEBAR_WIDTH
            : SIDEBAR.MINI_SIDEBAR_WIDTH,
        }}
        w="full"
        minH="100vh"
        h="full"
        sx={{
          transition: 'all .25s ease-in-out',
        }}
      >
        <SideBar isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

        <Header
          name={TITLES_HEADER[`${pathname.slice(1)}`] || TITLES_HEADER.DEFAULT}
        />

        {/* Button to show Sidebar on mobile */}
        <Image
          src={IMAGES.LEFT_ARROW.url}
          alt={IMAGES.LEFT_ARROW.alt}
          position="fixed"
          top={8}
          transform="rotate(180deg)"
          left={0}
          onClick={onClose}
        />

        {/* Content of the page */}
        {children}
      </Box>
    </Flex>
  );
};

export default MainLayout;
