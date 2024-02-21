'use client';

import lazy from 'next/dynamic';

import { InView } from 'react-intersection-observer';

// Components
import { Box, Grid, GridItem, Stack } from '@chakra-ui/react';
import { TotalStatisticListSkeleton } from '@/ui/components';

// Lazy load components
const CardPayment = lazy(() => import('@/ui/components/CardPayment'));
const BoxChat = lazy(() => import('@/ui/components/BoxChat'));
const TotalStatisticList = lazy(
  () => import('@/ui/components/TotalStatisticList'),
  {
    loading: () => <TotalStatisticListSkeleton />,
  },
);
const RevenueFlow = lazy(() => import('@/ui/components/RevenueFlow'));
const Efficiency = lazy(() => import('@/ui/components/Efficiency'));
const TransactionTable = lazy(() => import('@/ui/components/TransactionTable'));

export const dynamic = 'force-dynamic';

const DashBoardSection = () => (
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
        <InView>
          {({ inView, ref }) => (
            <GridItem colSpan={{ base: 3, xl: 2 }} ref={ref}>
              {inView && <RevenueFlow />}
            </GridItem>
          )}
        </InView>

        <InView>
          {({ inView, ref }) => (
            <GridItem ref={ref} display={{ base: 'none', xl: 'block' }}>
              {inView && <Efficiency />}
            </GridItem>
          )}
        </InView>
      </Grid>

      <InView>
        {({ inView, ref }) => (
          <Box
            ref={ref}
            mt={6}
            as="section"
            bgColor="background.component.primary"
            borderRadius={8}
            px={6}
            py={5}
          >
            {' '}
            {inView && <TransactionTable />}
          </Box>
        )}
      </InView>
    </GridItem>

    <InView>
      {({ inView, ref }) => (
        <GridItem mt={{ base: 6, '5xl': 0 }} ml={{ '5xl': 12 }} ref={ref}>
          {inView && (
            <Stack
              direction={{ base: 'column', lg: 'row', '2xl': 'column' }}
              spacing={{ base: 6, lg: 0 }}
            >
              <Box w="full">
                <CardPayment />
              </Box>

              <Box
                w="full"
                mt={{ base: 6, md: 0, '3xl': 6 }}
                ml={{ lg: 6, '2xl': 0 }}
              >
                <BoxChat />
              </Box>
            </Stack>
          )}
        </GridItem>
      )}
    </InView>
  </Grid>
);

export default DashBoardSection;
