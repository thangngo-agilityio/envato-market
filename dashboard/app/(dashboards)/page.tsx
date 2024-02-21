import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

// Constants
import { END_POINTS } from '@/lib/constants';

// Interface
import {
  IEfficiency,
  IRevenueFlow,
  ISpendingStatistics,
} from '@/lib/interfaces';

// Utils
import { prefetchStatistical } from '@/lib/utils';
import { DashBoardSection } from '@/ui/sections';

const Dashboard = async () => {
  const queryClient = new QueryClient();
  // Prefetch total statistics, revenue and efficiency data

  await prefetchStatistical<ISpendingStatistics[]>(
    END_POINTS.STATISTICS,
    queryClient,
  );
  await prefetchStatistical<IRevenueFlow[]>(END_POINTS.REVENUE, queryClient);
  await prefetchStatistical<IEfficiency[]>(
    `${END_POINTS.EFFICIENCY}/weekly`,
    queryClient,
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashBoardSection />
    </HydrationBoundary>
  );
};

export default Dashboard;
