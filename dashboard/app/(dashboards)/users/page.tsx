import { memo } from 'react';

import { UsersSection } from '@/ui/sections';

export const dynamic = 'force-dynamic';

const Users = () => <UsersSection />;

const UsersPage = memo(Users);

export default UsersPage;
