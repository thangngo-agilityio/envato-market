'use client';

import dynamic from 'next/dynamic';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

//Components
import { Box, Flex, Grid, GridItem, useMediaQuery } from '@chakra-ui/react';

// Constants
import { SCREEN_SIZES } from '@/lib/constants';

// Utils
import { memo, useEffect, useState } from 'react';

// Lazy loading components
const TransactionTable = dynamic(
  () => import('@/ui/components/TransactionTable'),
);
const CardPayment = dynamic(() => import('@/ui/components/CardPayment'));
const Efficiency = dynamic(() => import('@/ui/components/Efficiency'));
const TotalBalance = dynamic(() => import('@/ui/components/TotalBalance'));
const OverallBalance = dynamic(() => import('@/ui/components/OverallBalance'));

const WalletSection = () => {
  const queryClient = new QueryClient();
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const [isDesktop] = useMediaQuery(SCREEN_SIZES.LARGE_DESKTOP);

  useEffect(() => {
    isDesktop && setShouldRender(true);

    document.addEventListener('scroll', () => {
      isDesktop || window.scrollY
        ? setShouldRender(true)
        : setShouldRender(false);
    });
  }, [isDesktop]);

  console.log(shouldRender);

  return (
    <Grid
      bg="background.body.primary"
      px={{ base: 6, md: 12 }}
      py={12}
      templateColumns={{ base: 'repeat(1, 1fr)', '3xl': 'repeat(4, 1fr)' }}
      gap={{ base: 0, '2xl': 6 }}
      display={{ sm: 'block', xl: 'grid' }}
      minH="100vh"
    >
      <GridItem colSpan={1}>
        <Flex w="full" direction="column" gap={6}>
          <TotalBalance />
          <CardPayment />
        </Flex>
      </GridItem>
      <GridItem colSpan={{ base: 1, xl: 3 }} mt={{ base: 6, '3xl': 0 }}>
        <Flex direction="column" gap={6}>
          <Flex
            flex={1}
            gap={6}
            direction={{ base: 'column', xl: 'row' }}
            boxSizing="border-box"
            w="100%"
          >
            <Box w={{ '3xl': '65%' }} flex={2}>
              <HydrationBoundary state={dehydrate(queryClient)}>
                <OverallBalance />
              </HydrationBoundary>
            </Box>
            <Box w={{ '3xl': '35%' }} flex={1}>
              <HydrationBoundary state={dehydrate(queryClient)}>
                <Efficiency />
              </HydrationBoundary>
            </Box>
          </Flex>
          <Box>
            <Box
              as="section"
              bgColor="background.component.primary"
              borderRadius={8}
              px={6}
              py={5}
            >
              {shouldRender && <TransactionTable />}
            </Box>
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  );
};

const WalletPage = memo(WalletSection);

export default WalletPage;
