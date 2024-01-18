'use client';

import { memo } from 'react';
import isEqual from 'react-fast-compare';
import dynamic from 'next/dynamic';
import { Image } from '@chakra-ui/react';
import { IMAGES } from '@/lib/constants';

// components
const ExpandSidebar = dynamic(() => import('../../components/ExpandSidebar'));
const MiniSidebar = dynamic(() => import('../../components/MiniSidebar'));

type TSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

const Sidebar = ({ isOpen, onOpen, onClose }: TSidebarProps) => (
  <>
    <ExpandSidebar isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    <MiniSidebar isOpen={!isOpen} onClose={onOpen} />
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
const SideBarComponent = memo(Sidebar, isEqual);

export default SideBarComponent;
