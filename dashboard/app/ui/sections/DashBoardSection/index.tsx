'use client';

import lazy from 'next/dynamic';

import { useEffect, useState } from 'react';

// Components
import { Box, Grid, GridItem, Stack, useMediaQuery } from '@chakra-ui/react';
import { SCREEN_SIZES } from '@/lib/constants';

// Lazy load components
const CardPayment = lazy(() => import('@/ui/components/CardPayment'));
const BoxChat = lazy(() => import('@/ui/components/BoxChat'));
const TotalStatisticList = lazy(
  () => import('@/ui/components/TotalStatisticList'),
);
const RevenueFlow = lazy(() => import('@/ui/components/RevenueFlow'));
const Efficiency = lazy(() => import('@/ui/components/Efficiency'));
const TransactionTable = lazy(() => import('@/ui/components/TransactionTable'));

export const dynamic = 'force-dynamic';

const DashBoardSection = () => {
  const [showBelow, setShowBelow] = useState<boolean>(false);
  const [isDesktop] = useMediaQuery(SCREEN_SIZES.LARGE_DESKTOP);

  useEffect(() => {
    isDesktop && setShowBelow(true);
    window.addEventListener('scroll', () => {
      isDesktop || window.scrollY ? setShowBelow(true) : setShowBelow(false);
    });
  }, [isDesktop]);

  return (
    <Grid
      display={{ sm: 'block', md: 'grid' }}
      bg="background.body.primary"
      p={{ base: 6, xl: 12 }}
      templateColumns={{ base: 'repeat(1, 1fr)', '5xl': 'repeat(4, 1fr)' }}
      gap={0}
    >
      <GridItem colSpan={3}>
        <TotalStatisticList />

        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }}
          mt={6}
          gap={6}
        >
          <GridItem colSpan={{ base: 3, xl: 2 }}>
            {showBelow && <RevenueFlow />}
          </GridItem>
          <GridItem display={{ base: 'none', xl: 'block' }}>
            <Efficiency />
          </GridItem>
        </Grid>

        <Box
          mt={6}
          as="section"
          bgColor="background.component.primary"
          borderRadius={8}
          px={6}
          py={5}
        >
          {' '}
          {showBelow && <TransactionTable />}
        </Box>
      </GridItem>
      <GridItem mt={{ base: 6, '5xl': 0 }} ml={{ '5xl': 12 }}>
        <Stack
          direction={{ base: 'column', lg: 'row', '2xl': 'column' }}
          spacing={{ base: 6, lg: 0 }}
        >
          <Box w="full">{showBelow && <CardPayment />}</Box>

          <Box
            w="full"
            mt={{ base: 6, md: 0, '3xl': 6 }}
            ml={{ lg: 6, '2xl': 0 }}
          >
            {showBelow && <BoxChat />}
          </Box>
        </Stack>
      </GridItem>
    </Grid>
  );
};

export default DashBoardSection;
