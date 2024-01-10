import { useState, memo, type ReactNode, useCallback } from 'react';
import isEqual from 'react-fast-compare';

// Components
import HeaderMobile from '../HeaderMobile';
import SideBarAllDevices from '../SideBar';

type TWrapperProps = {
  children?: ReactNode;
  pathName: string;
};

const Wrapper = ({ children, pathName }: TWrapperProps): JSX.Element => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);

  const handleToggleSidebar = useCallback(
    () => setIsOpenSidebar((prev) => !prev),
    [],
  );

  return (
    <section className='flex'>
      <SideBarAllDevices
        pathName={pathName}
        isOpen={isOpenSidebar}
        onToggle={handleToggleSidebar}
      />
      <div className='flex-1 min-h-[60vh]'>
        <HeaderMobile onToggleSidebar={handleToggleSidebar} />
        <div className='pt-[70px] md:pt-0 h-full'>{children}</div>
      </div>
    </section>
  );
};

const WrapperMemorized = memo(Wrapper, isEqual);

export default WrapperMemorized;
