import { useQuery } from '@tanstack/react-query';

// Constants
import { END_POINTS } from '@/lib/constants';

// Types
import { TWallet } from '@/lib/interfaces';

// Services
import { MainHttpService } from '@/lib/services';

export const useWallet = (id?: string) => {
  const { data, ...query } = useQuery<{ data: TWallet }>({
    queryKey: [END_POINTS.MY_WALLET, id],
    queryFn: () =>
      MainHttpService.get({ path: END_POINTS.MY_WALLET, userId: id }),
  });

  return {
    ...query,
    currentWalletMoney: data?.data,
  };
};
