// Components
import { Button } from '@app/components';
import { HamburgerMenuIcon } from '@app/components/icons';

const HeaderMobile = (): JSX.Element => (
  <header className='bg-white flex justify-between items-center fixed top-0 left-0 right-0 h-[70px] shadow-navMobile py-2 px-8 md:hidden'>
    <a href='#' className='text-infoRGBA'>
      <img
        src='/assets/logo-header-mobile.webp'
        alt='Logo'
        width={70}
        height={28}
        loading='lazy'
      />
    </a>
    <Button className='flex justify-center items-center bg-transparent hover:bg-transparent'>
      <HamburgerMenuIcon className='fill-sun stroke-2' />
    </Button>
  </header>
);

export default HeaderMobile;
