import { memo } from 'react';
import isEqual from 'react-fast-compare';
import dynamic from 'next/dynamic';

// components
const ExpandSidebar = dynamic(() => import('../../components/ExpandSidebar'));
const MiniSidebar = dynamic(() => import('../../components/MiniSidebar'));

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
