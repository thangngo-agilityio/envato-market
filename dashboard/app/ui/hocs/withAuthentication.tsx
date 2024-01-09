'use client';

import { FunctionComponent } from 'react';
import { redirect, usePathname } from 'next/navigation';

// Constants
import { PRIVATE_ROUTES, PUBLIC_ROUTES, ROUTES } from '@/lib/constants';

// Stores
import { TAuthStoreData, authStore } from '@/lib/stores';

type TValidateRoute = {
  id: number;
  path: string;
};

export const withAuthentication = <TProps extends object>(
  Component: FunctionComponent<TProps>,
): FunctionComponent<TProps> => {
  const Authentication = (props: TProps): JSX.Element => {
    const pathname = usePathname();
    const user = authStore((state): TAuthStoreData['user'] => state.user);
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

    return <Component {...props} />;
  };

  return Authentication;
};
