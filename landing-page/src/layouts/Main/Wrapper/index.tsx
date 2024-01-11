import { useState, memo, type ReactNode, useCallback, useEffect } from 'react';
import isEqual from 'react-fast-compare';

// Components
import HeaderMobile from '../HeaderMobile';
import SideBarAllDevices from '../SideBar';
import { Button } from '@app/components';
import { ArrowTop } from '@app/components/icons';

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

  useEffect(() => {
    const handleScroll = () => {
      const gotoTopBtn: HTMLButtonElement | null =
        document.querySelector('.go-to-top');

      if (gotoTopBtn) {
        if (window.scrollY >= 600) {
          gotoTopBtn.classList.replace('hidden', 'block');
          return;
        }

        gotoTopBtn.classList.replace('block', 'hidden');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className='flex scroll-smooth' id='top'>
      <SideBarAllDevices
        pathName={pathName}
        isOpen={isOpenSidebar}
        onToggle={handleToggleSidebar}
      />
      <div className='flex-1 min-h-[60vh]'>
        <HeaderMobile onToggleSidebar={handleToggleSidebar} />
        <div className='pt-[70px] md:pt-0 h-full'>{children}</div>
      </div>

      <Button className='go-to-top hidden fixed z-40 bottom-10 right-10 !w-fit !h-fit !p-0 !pb-0 shadow-md'>
        <a href='#top' className='!p-3 block'>
          <ArrowTop width={16} height={16} fill='#fff' />
        </a>
      </Button>
    </section>
  );
};

const WrapperMemorized = memo(Wrapper, isEqual);

export default WrapperMemorized;
