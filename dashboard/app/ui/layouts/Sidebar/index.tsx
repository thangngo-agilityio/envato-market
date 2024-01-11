'use client';

import { memo, useEffect } from 'react';
import isEqual from 'react-fast-compare';
import dynamic from 'next/dynamic';
import { useDisclosure, Image, useMediaQuery } from '@chakra-ui/react';
import { IMAGES } from '@/lib/constants';

// components
const ExpandSidebar = dynamic(() => import('../../components/ExpandSidebar'));
const MiniSidebar = dynamic(() => import('../../components/MiniSidebar'));

const Sidebar = () => {
  const [isDesktop] = useMediaQuery('(min-width: 1732px)');
  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: false,
  });

  useEffect(() => {
    if (isDesktop) {
      onOpen();
    }
  }, [isDesktop, onOpen]);

  return (
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
};

const SideBarComponent = memo(Sidebar, isEqual);

export default SideBarComponent;
