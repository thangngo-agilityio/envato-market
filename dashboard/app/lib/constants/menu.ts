// Constants
import { AUTHENTICATION_ROLE, ROUTES } from '@/lib/constants';

// Components
import { Account, Logout, UserIcon } from '@/ui/components/Icons';

export const MENU_LIST_ICON = (role?: string) => [
  {
    id: 1,
    href: `/${ROUTES.SETTING}`,
    value: 'My profile',
    icon: Account,
  },
  {
    ...(role === AUTHENTICATION_ROLE.SUPER_ADMIN && {
      id: 2,
      href: `/${ROUTES.USER}`,
      value: 'User',
      icon: UserIcon,
    }),
  },
];

export const MENU_LIST = [
  {
    id: 1,
    href: `/${ROUTES.LOGIN}`,
    value: 'Logout',
    icon: Logout,
  },
];
