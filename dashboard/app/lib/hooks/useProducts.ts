import { useQuery } from '@tanstack/react-query';

import { END_POINTS } from '@/lib/constants';
import { getProducts } from '@/lib/services';
import { authStore } from '../stores';

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
