import { memo } from 'react';

// Components
import { Grid, GridItem } from '@chakra-ui/react';
import { TotalStatisticCard } from '@/ui/components';

// Types
import { ISpendingStatistics } from '@/lib/interfaces';

// Mocks
import { INITIAL_TOTAL_STATISTICS } from '@/lib/mocks';

interface TotalStatisticListProps {
  data?: ISpendingStatistics[];
}

const TotalStatisticListComponent = ({
  data = INITIAL_TOTAL_STATISTICS,
}: TotalStatisticListProps) => (
  <Grid
    templateColumns={{ base: 'repeat(1, 1fr)', xl: 'repeat(3, 1fr)' }}
    gap={6}
  >
    {data.map(({ title, total, growth, weeklyIncome }: ISpendingStatistics) => (
      <GridItem key={title}>
        <TotalStatisticCard
          title={title}
          total={total}
          growth={growth}
          weeklyIncome={weeklyIncome}
        />
      </GridItem>
    ))}
  </Grid>
);

const TotalStatisticList = memo(TotalStatisticListComponent);

export default TotalStatisticList;
