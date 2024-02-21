import { memo } from 'react';
import { QueryClient } from '@tanstack/react-query';

// Section
import { WalletSection } from '@/ui/sections';

// Constants
import { END_POINTS } from '@/lib/constants';

// Type
import { IEfficiency, TOverallBalance } from '@/lib/interfaces';

// Utils
import { prefetchStatistical } from '@/lib/utils';

export const dynamic = 'force-dynamic';

const MyWallet = async () => {
  const queryClient = new QueryClient();

  await prefetchStatistical<IEfficiency[]>(
    `${END_POINTS.EFFICIENCY}/weekly`,
    queryClient,
  );

  await prefetchStatistical<TOverallBalance>(
    END_POINTS.OVERALL_BALANCE,
    queryClient,
  );

  return <WalletSection />;
};

const WalletPage = memo(MyWallet);

export default WalletPage;
