'use client';

import dynamic from 'next/dynamic';

//Components
import { Box, Flex, Grid, GridItem, useMediaQuery } from '@chakra-ui/react';

import { useEffect, useState } from 'react';

// Lazy loading components
const TransactionTable = dynamic(
  () => import('@/ui/components/TransactionTable'),
);
const CardPayment = dynamic(() => import('@/ui/components/CardPayment'));
const Efficiency = dynamic(() => import('@/ui/components/Efficiency'));
const TotalBalance = dynamic(() => import('@/ui/components/TotalBalance'));
const OverallBalance = dynamic(() => import('@/ui/components/OverallBalance'));

const MyWalletsSection = () => {
  const [showBelow, setShowBelow] = useState<boolean>(false);
  const [isNotMobile] = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    isNotMobile && setShowBelow(true);
    window.addEventListener('scroll', () => {
      isNotMobile || window.scrollY ? setShowBelow(true) : setShowBelow(false);
    });
  }, [isNotMobile]);

  console.log(showBelow);

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
              {showBelow && <OverallBalance />}
            </Box>
            <Box w={{ '3xl': '35%' }} flex={1}>
              {showBelow && <Efficiency />}
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
              {showBelow && <TransactionTable />}
            </Box>
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default MyWalletsSection;
