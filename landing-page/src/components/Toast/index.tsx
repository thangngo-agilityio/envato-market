import { useCallback, useEffect, useMemo, useState } from 'react';

// Components
import { Button } from '..';
import CloseSideBarMenuMemorized from '../icons/CloseSideBar';

export type TTypeToast = 'success' | 'error';
type TToastProps = {
  isOpen?: boolean;
  type?: TTypeToast;
  message?: string;
  onHover?: () => void;
  onBlur?: () => void;
};

const Toast = ({
  isOpen = false,
  type = 'success',
  message = '',
  onHover,
  onBlur,
}: TToastProps): JSX.Element | null => {
  const [isOpenToast, setIsOpenToast] = useState<boolean>(isOpen);

  const {
    text = '',
    button,
    toastBg,
  }: Record<string, string> = useMemo(() => {
    const styles: Record<Required<typeof type>, Record<string, string>> = {
      success: {
        toastBg: 'bg-green-400',
        button: '#fff',
      },
      error: {
        toastBg: 'bg-red-400',
        button: '#000',
        text: 'text-white',
      },
    };

    return styles[type];
  }, [type]);

  const handleCloseToast = useCallback(() => setIsOpenToast(false), []);

  useEffect(() => {
    if (isOpen && !isOpenToast) {
      setIsOpenToast(isOpen);
    }
  }, [isOpen, isOpenToast]);

  useEffect(() => {
    if (isOpenToast) {
      window.addEventListener('click', handleCloseToast);
    }

    return () => {
      window.removeEventListener('click', handleCloseToast);
    };
  }, [handleCloseToast, isOpenToast]);

  return isOpen ? (
    <section
      className={`fixed flex flex-col z-50 top-10 left-[50%] translate-x-[-50%]  w-[80%] sm:w-[400px] p-1 shadow-2xl rounded-md ${toastBg}`}
      onClick={(e) => e.preventDefault()}
      onMouseMove={onHover}
      onMouseLeave={onBlur}
    >
      <Button
        aria-label='Close Button'
        className='flex bg-transparent w-10 h-10 justify-center items-center rounded-[100%] pt-0 pb-[0px] self-end'
        onClick={handleCloseToast}
      >
        <CloseSideBarMenuMemorized width={10} height={10} fill={button} />
      </Button>
      <p className={`px-3 pb-3 text-sm nearLg:text-md ${text}`}>{message}</p>
    </section>
  ) : null;
};

export default Toast;
