import type { ReactNode } from 'react';

type TIndicatorProps = {
  isOpen?: boolean;
  children?: ReactNode;
};

const Indicator = ({
  isOpen = false,
  children,
}: TIndicatorProps): JSX.Element => (
  <>
    {children}
    {isOpen && (
      <section className='fixed flex justify-center items-center z-50 inset-0 bg-black opacity-65'>
        <span className='block w-10 h-10 bg-transparent border-2 border-gray-50 rounded-full border-l-transparent animate-spinner'></span>
      </section>
    )}
  </>
);

export default Indicator;
