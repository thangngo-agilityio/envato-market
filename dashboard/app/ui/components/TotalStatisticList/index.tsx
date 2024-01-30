'use client';

import { memo } from 'react';

// Components
import { Grid, GridItem } from '@chakra-ui/react';
import { Fetching, TotalStatisticCard } from '@/ui/components';

// Types
import { ISpendingStatistics } from '@/lib/interfaces';

// Mocks
import { INITIAL_TOTAL_STATISTICS } from '@/lib/mocks';

// Hooks
import { useGetStatistic } from '@/lib/hooks';

// Constants
import { END_POINTS } from '@/lib/constants';

const TotalStatisticListComponent = () => {
  const {
    data = INITIAL_TOTAL_STATISTICS,
    isLoading,
    isError,
  } = useGetStatistic<ISpendingStatistics[]>(END_POINTS.STATISTICS);

  return (
    <Fetching isError={isError} errorMessage="Total statistic data error">
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', xl: 'repeat(3, 1fr)' }}
        gap={6}
      >
        {data.map(
          ({ title, total, growth, weeklyIncome }: ISpendingStatistics) => (
            <GridItem key={title}>
              <TotalStatisticCard
                title={title}
                total={total}
                growth={growth}
                weeklyIncome={weeklyIncome}
                isLoading={isLoading}
              />
            </GridItem>
          ),
        )}
      </Grid>
    </Fetching>
  );
};

const TotalStatisticList = memo(TotalStatisticListComponent);

export default TotalStatisticList;
