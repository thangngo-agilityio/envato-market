import { memo } from 'react';

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import { UsersSection } from '@/ui/sections';
import { prefetchUsers } from '@/lib/utils';

const Users = async () => {
  const queryClient = new QueryClient();
  await prefetchUsers(queryClient);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UsersSection />
    </HydrationBoundary>
  );
};

const UsersPage = memo(Users);

export default UsersPage;
