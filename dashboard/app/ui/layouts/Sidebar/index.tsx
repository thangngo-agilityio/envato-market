'use client';

import { memo } from 'react';
import isEqual from 'react-fast-compare';
import dynamic from 'next/dynamic';
import { Image } from '@chakra-ui/react';

// Constants
import { AUTHENTICATION_ROLE, IMAGES } from '@/lib/constants';

// Interfaces
import { TMenuItem } from '@/ui/components/common/Menu';
import { TUserDetail } from '@/lib/interfaces';

// components
const ExpandSidebar = dynamic(() => import('@/ui/components/ExpandSidebar'));
const MiniSidebar = dynamic(() => import('@/ui/components/MiniSidebar'));

export type TSidebarProps = {
  menuItem?: TMenuItem[];
  role?: string;
  isExpandSidebar?: boolean;
  user?: TUserDetail;
  onClose: () => void;
  onOpen: () => void;
  onSignOut: () => void;
};

const Sidebar = ({ isExpandSidebar, user, ...props }: TSidebarProps) => {
  const { role = AUTHENTICATION_ROLE.MEMBER } = user || ({} as TUserDetail);

  return (
    <>
      {isExpandSidebar ? (
        <ExpandSidebar
          {...props}
          role={role}
          isExpandSidebar={isExpandSidebar}
        />
      ) : (
        <MiniSidebar
          {...props}
          role={role}
          isExpandSidebar={!isExpandSidebar}
        />
      )}

      <Image
        src={IMAGES.LEFT_ARROW.url}
        alt={IMAGES.LEFT_ARROW.alt}
        position="fixed"
        top={8}
        transform="rotate(180deg)"
        left={0}
        cursor="pointer"
        display={{ base: 'block', md: 'none', lg: 'block' }}
        onClick={props.onOpen}
      />
    </>
  );
};

const SideBarComponent = memo(Sidebar, isEqual);

export default SideBarComponent;
