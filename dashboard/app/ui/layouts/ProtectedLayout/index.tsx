'use client';

import { PRIVATE_ROUTES, PUBLIC_ROUTES, ROUTES } from '@/lib/constants';
import { TAuthStoreData, authStore } from '@/lib/stores';
import { redirect, usePathname } from 'next/navigation';

type TValidateRoute = {
  id: number;
  path: string;
};

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const user = authStore((state): TAuthStoreData['user'] => state.user);

  console.log('user', user);

  const isMatchPrivateRoute: boolean = PRIVATE_ROUTES.some(
    (route: TValidateRoute) =>
      pathname === ROUTES.ROOT || `/${route.path}` === pathname,
  );
  const isMatchPublicRoute: boolean = PUBLIC_ROUTES.some(
    (route: TValidateRoute) => `/${route.path}` === pathname,
  );

  if (isMatchPublicRoute && !!user) {
    return redirect(ROUTES.ROOT);
  }

  if (isMatchPrivateRoute && !user) {
    return redirect(ROUTES.LOGIN);
  }

  return children;
};

export default ProtectedLayout;
