import { memo } from 'react';

// Components
import { Grid, GridItem } from '@chakra-ui/react';
import {
  TotalStatisticCard,
  // TotalStatisticListSkeleton,
} from '@/ui/components';

// Types
import { ISpendingStatistics } from '@/lib/interfaces';

// Mocks
import { INITIAL_TOTAL_STATISTICS } from '@/lib/mocks';
import { getStatistical } from '@/lib/services';
import { END_POINTS } from '@/lib/constants';
import { QueryProvider } from '@/ui/providers';

// interface TotalListComponentProps {
//   spendingStatistics?: ISpendingStatistics[];
//   isLoading?: boolean;
// }

const TotalStatisticListComponent = async () => {
  // if (isLoading) return <TotalStatisticListSkeleton />;
  const spendingStatistics =
    (await getStatistical<ISpendingStatistics[]>(END_POINTS.STATISTICS)) ||
    INITIAL_TOTAL_STATISTICS;

  return (
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', xl: 'repeat(3, 1fr)' }}
      gap={6}
    >
      {spendingStatistics.map(
        ({ title, total, growth, weeklyIncome }: ISpendingStatistics) => (
          <GridItem key={title}>
            <TotalStatisticCard
              title={title}
              total={total}
              growth={growth}
              weeklyIncome={weeklyIncome}
            />
          </GridItem>
        ),
      )}
    </Grid>
  );
};

const WrappedTotalStatisticList = () => (
  <QueryProvider>
    <TotalStatisticListComponent />
  </QueryProvider>
);

const TotalStatisticList = memo(WrappedTotalStatisticList);

export default TotalStatisticList;
