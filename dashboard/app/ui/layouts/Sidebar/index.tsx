import { memo } from 'react';
import isEqual from 'react-fast-compare';
import dynamic from 'next/dynamic';

// components
import { MiniSidebar } from '@/ui/components';
const ExpandSidebar = dynamic(() => import('../../components/ExpandSidebar'));

export type SidebarProps = {
  onClose: () => void;
  onOpen: () => void;
  isOpen: boolean;
};

const Sidebar = ({ onClose, onOpen, isOpen }: SidebarProps) => (
  <>
    <ExpandSidebar onClose={onClose} onOpen={onOpen} isOpen={!isOpen} />
    <MiniSidebar onClose={onClose} isOpen={isOpen} />
  </>
);

const SideBarComponent = memo(Sidebar, isEqual);

export default SideBarComponent;
