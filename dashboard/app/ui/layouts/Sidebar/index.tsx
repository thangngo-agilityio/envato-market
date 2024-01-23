'use client';

import { memo } from 'react';
import isEqual from 'react-fast-compare';
import dynamic from 'next/dynamic';
import { Image } from '@chakra-ui/react';
import { AUTHENTICATION_ROLE, IMAGES } from '@/lib/constants';
import { TMenuItem } from '@/ui/components/common/Menu';
import { TUserDetail } from '@/lib/interfaces';

// components
const ExpandSidebar = dynamic(() => import('../../components/ExpandSidebar'));
const MiniSidebar = dynamic(() => import('../../components/MiniSidebar'));

export type TSidebarProps = {
  menuItem?: TMenuItem[];
  role?: string;
  isOpen: boolean;
  user?: TUserDetail;
  onClose: () => void;
  onOpen: () => void;
};

const Sidebar = ({ isOpen, user, onClose, onOpen }: TSidebarProps) => {
  const { role = AUTHENTICATION_ROLE.MEMBER } = user as TUserDetail;

  return (
    <>
      <ExpandSidebar
        role={role}
        isOpen={!isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
      <MiniSidebar role={role} isOpen={isOpen} onClose={onClose} />
      <Image
        src={IMAGES.LEFT_ARROW.url}
        alt={IMAGES.LEFT_ARROW.alt}
        position="fixed"
        top={8}
        transform="rotate(180deg)"
        left={0}
        cursor="pointer"
        display={{ base: 'block', md: 'none', lg: 'block' }}
        onClick={onOpen}
      />
    </>
  );
};

const SideBarComponent = memo(Sidebar, isEqual);

export default SideBarComponent;
