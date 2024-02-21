'use client';

import dynamic from 'next/dynamic';

//Components
import { Box, Flex, useMediaQuery } from '@chakra-ui/react';

import { useEffect, useState } from 'react';

// Lazy loading components
const TransactionTable = dynamic(
  () => import('@/ui/components/TransactionTable'),
);
const Efficiency = dynamic(() => import('@/ui/components/Efficiency'));
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

  return (
    showBelow && (
      <Flex direction="column" gap={6}>
        <Flex
          flex={1}
          gap={6}
          direction={{ base: 'column', xl: 'row' }}
          boxSizing="border-box"
          w="100%"
        >
          <Box w={{ '3xl': '65%' }} flex={2}>
            <OverallBalance />
          </Box>
          <Box w={{ '3xl': '35%' }} flex={1}>
            <Efficiency />
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
            <TransactionTable />
          </Box>
        </Box>
      </Flex>
    )
  );
};

export default MyWalletsSection;
