'use client';

import dynamic from 'next/dynamic';
import { SIDEBAR } from '@/lib/constants';
import { Box, Flex } from '@chakra-ui/react';

// Component
import { Header } from '@/ui/layouts';
import { TAuthStoreData, authStore } from '@/lib/stores';

// Interfaces
import { TUserDetail } from '@/lib/interfaces';

const SideBar = dynamic(() => import('@/ui/layouts/Sidebar'));

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const user = authStore((state): TAuthStoreData['user'] => state.user);

  return (
    <Flex w="full" h="full" bg="background.body.primary">
      <Box
        pl={{
          base: 0,
          md: SIDEBAR.MINI_SIDEBAR_WIDTH,
          lg: SIDEBAR.MINI_SIDEBAR_WIDTH,
          '4xl': SIDEBAR.EXPAND_SIDEBAR_WIDTH,
        }}
        w="full"
        minH="100vh"
        h="full"
        sx={{
          transition: 'all .25s ease-in-out',
        }}
      >
        <SideBar />

        <Header user={user as TUserDetail} />
        {children}
      </Box>
    </Flex>
  );
};

export default MainLayout;
