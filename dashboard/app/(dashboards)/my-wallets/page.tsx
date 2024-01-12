import { memo } from 'react';
import dynamic from 'next/dynamic';
import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import { getStatistical } from '@/lib/services';
import { TOverallBalance } from '@/lib/interfaces';
import { END_POINTS } from '@/lib/constants';

// Lazy loading components
const TransactionTable = dynamic(
  () => import('@/ui/components/TransactionTable'),
);
const CardPayment = dynamic(() => import('@/ui/components/CardPayment'));
const Efficiency = dynamic(() => import('@/ui/components/Efficiency'));
const TotalBalance = dynamic(() => import('@/ui/components/TotalBalance'));
const OverallBalance = dynamic(() => import('@/ui/components/OverallBalance'));

const MyWallets = async () => {
  const overallBalance = await getStatistical<TOverallBalance>(
    END_POINTS.OVERALL_BALANCE,
  );

  return (
    <Grid
      bg="background.body.primary"
      px={{ base: 6, md: 12 }}
      py={12}
      templateColumns={{ base: 'repeat(1, 1fr)', '3xl': 'repeat(4, 1fr)' }}
      gap={{ base: 0, '2xl': 6 }}
      display={{ sm: 'block', md: 'grid' }}
      minH="100vh"
    >
      <GridItem colSpan={1}>
        <Flex w="full" direction="column" gap={6}>
          <TotalBalance />
          <CardPayment />
        </Flex>
      </GridItem>
      <GridItem colSpan={{ xl: 3 }} mt={{ base: 6, '3xl': 0 }}>
        <Flex direction="column" gap={6}>
          <Flex
            gap={6}
            direction={{ base: 'column', xl: 'row' }}
            boxSizing="border-box"
          >
            <Box flex={2}>
              <OverallBalance overallBalanceData={overallBalance} />
            </Box>
            <Box flex={1}>
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
      </GridItem>
    </Grid>
  );
};

const MyWalletPage = memo(MyWallets);

export default MyWalletPage;
