// Constants
import { AUTHENTICATION_ROLE, ROUTES } from '@/lib/constants';

// Components
import { Account, Logout } from '@/ui/components/Icons';

export const MENU_LIST_ICON = [
  {
    id: 1,
    href: `/${ROUTES.SETTING}`,
    value: 'My profile',
    icon: Account,
  },
  {
    id: 2,
    href: `/${ROUTES.LOGIN}`,
    value: 'Logout',
    icon: Logout,
  },
];

export const MENU_LIST = (role?: string) => [
  {
    ...(role === AUTHENTICATION_ROLE.SUPER_ADMIN && {
      id: 2,
      href: `/${ROUTES.USER}`,
      value: 'User',
    }),
  },
];
