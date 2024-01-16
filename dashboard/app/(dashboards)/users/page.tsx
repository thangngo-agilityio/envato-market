import { memo } from 'react';

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import { UsersSection } from '@/ui/sections';
import { prefetchUsers } from '@/lib/utils';
import { QueryProvider } from '@/ui/providers';

const Users = async () => {
  const queryClient = new QueryClient();
  await prefetchUsers(queryClient);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UsersSection />
    </HydrationBoundary>
  );
};

const WrappedUsers = () => (
  <QueryProvider>
    <Users />
  </QueryProvider>
);

const UsersPage = memo(WrappedUsers);

export default UsersPage;
