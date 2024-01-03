import { useState, memo, type ReactNode, useCallback } from 'react';
import isEqual from 'react-fast-compare';

// Components
import HeaderMobile from '../HeaderMobile';
import SideBarAllDevices from '../Sidebar';

type TWrapperProps = {
  children?: ReactNode;
};

const Wrapper = ({ children }: TWrapperProps): JSX.Element => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);

  const handleToggleSidebar = useCallback(
    () => setIsOpenSidebar((prev) => !prev),
    [],
  );

  return (
    <section className='flex'>
      <SideBarAllDevices
        isOpen={isOpenSidebar}
        onToggle={handleToggleSidebar}
      />
      <div className='flex-1'>
        <HeaderMobile onToggleSidebar={handleToggleSidebar} />
        <div className='pt-[70px] md:pt-0'>{children}</div>
      </div>
    </section>
  );
};

const WrapperMemorized = memo(Wrapper, isEqual);

export default WrapperMemorized;
