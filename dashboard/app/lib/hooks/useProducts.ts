// Lib
import { useQuery } from '@tanstack/react-query';

// Store
import { authStore } from '../stores';

// Constants
import { END_POINTS } from '@/lib/constants';

// Services
import { getProducts } from '@/lib/services';

export type TSearchProduct = {
  name: string;
};

export const useProducts = (queryParam?: TSearchProduct) => {
  const { user } = authStore();

  const { name: searchName }: TSearchProduct = Object.assign(
    {
      name: '',
    },
    queryParam,
  );

  const { data: products = [] } = useQuery({
    queryKey: [END_POINTS.TRANSACTIONS, searchName],
    queryFn: ({ signal }) => getProducts('', { signal }, user?.id),
  });

  return {
    products,
  };
};
