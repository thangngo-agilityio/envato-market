import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

// Type
import { IEfficiency, TOverallBalance } from '@/lib/interfaces';

// Constants
import { END_POINTS } from '@/lib/constants';

// Utils
import { prefetchStatistical } from '@/lib/utils';
import { MyWalletSection } from '@/ui/sections';

const MyWallets = async () => {
  const queryClient = new QueryClient();

  await prefetchStatistical<IEfficiency[]>(
    `${END_POINTS.EFFICIENCY}/weekly`,
    queryClient,
  );

  await prefetchStatistical<TOverallBalance>(
    END_POINTS.OVERALL_BALANCE,
    queryClient,
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyWalletSection />
    </HydrationBoundary>
  );
};

export default MyWallets;
