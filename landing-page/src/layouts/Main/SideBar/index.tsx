// Components
import Button from '@app/components/Button/index.tsx';
import CloseSideBar from '@app/components/icons/CloseSideBar/index.tsx';

// Mocks
import { NAVBAR } from '@app/mocks';

const SideBarAllDevices = (): JSX.Element => (
  <header className='relative z-10 max-w-[320px] bg-white py-[60px] px-[70px] h-full'>
    <Button className='bg-sun'>
      <CloseSideBar width='12' height='12' />
    </Button>
    <h1>
      <a href='#'>
        <img
          src='/assets/logo-header-mobile.webp'
          alt='Logo'
          width={137}
          height={55}
          loading='lazy'
        />
      </a>
    </h1>
    <nav>
      <ul>
        {NAVBAR.map(
          ({ id, href, text }): JSX.Element => (
            <li key={id} className='px-5'>
              <a
                href={href}
                className='text-secondary hover:text-sun uppercase text-sm'
              >
                {text}
              </a>
            </li>
          ),
        )}
      </ul>
    </nav>
  </header>
);

export default SideBarAllDevices;
