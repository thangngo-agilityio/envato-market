import { memo } from 'react';
import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import isEqual from 'react-fast-compare';
import dynamic from 'next/dynamic';
import { QueryProvider } from '@/ui/providers';

// Lazy loading components
const CardPayment = dynamic(() => import('@/ui/components/CardPayment'));
const BoxChat = dynamic(() => import('@/ui/components/BoxChat'));
const TransactionTable = dynamic(
  () => import('@/ui/components/TransactionTable'),
);

const Histories = () => (
  <Grid
    bg="background.body.primary"
    py={12}
    px={{ base: 6, xl: 12 }}
    templateColumns={{ base: 'repeat(1, 1fr)', '2xl': 'repeat(4, 1fr)' }}
    display={{ sm: 'block', md: 'grid' }}
    gap={{ base: 0, '2xl': 12 }}
  >
    <GridItem colSpan={3}>
      <Box
        as="section"
        bgColor="background.component.primary"
        borderRadius={8}
        px={6}
        py={5}
      >
        <QueryProvider>
          <TransactionTable />
        </QueryProvider>
      </Box>
    </GridItem>
    <GridItem mt={{ base: 6, '2xl': 0 }}>
      <Flex direction={{ base: 'column', lg: 'row', xl: 'column' }} gap={6}>
        <CardPayment />
        <BoxChat />
      </Flex>
    </GridItem>
  </Grid>
);

const HistoryPage = memo(Histories, isEqual);

export default HistoryPage;
