import dynamic from 'next/dynamic';
import { SIDEBAR } from '@/lib/constants';
import { Box, Flex } from '@chakra-ui/react';

const SideBar = dynamic(() => import('@/ui/layouts/Sidebar'));
const Header = dynamic(() => import('@/ui/layouts/Header'));

const MainLayout = ({ children }: { children: React.ReactNode }) => (
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

      <Header />
      {children}
    </Box>
  </Flex>
);

export default MainLayout;
