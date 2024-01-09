import {
  useRef,
  type RefObject,
  useCallback,
  type FormEventHandler,
} from 'react';

// Hooks
import { useToast } from '@app/hooks';

// Components
import { Input, Button, Toast } from '@app/components';

// Constants
import { ERROR_MESSAGES, REGEXPS, SUCCESS_MESSAGE } from '@app/constants';

const SubscribeForm = (): JSX.Element => {
  const { toast, showToast, resetToast, pauseToast } = useToast();
  const refInput: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();

      const value: string = refInput.current ? refInput.current.value : '';
      const isValid: boolean = !!value && REGEXPS.EMAIL.test(value);

      if (isValid) {
        refInput.current && (refInput.current.value = '');

        return showToast({
          message: SUCCESS_MESSAGE.SUBSCRIBE,
        });
      }

      return showToast({
        message: ERROR_MESSAGES.SUBSCRIBE,
        type: 'error',
      });
    },
    [showToast],
  );

  return (
    <form className='w-full flex mt-3xl lg:mt-0' onSubmit={handleSubmit}>
      <div className='flex-1 '>
        <Input
          ref={refInput}
          placeholder='Your E-mail'
          size='md'
          variant='secondary'
          className='font-normal outline-none focus:shadow-none'
        />
      </div>
      <Button
        type='submit'
        className='text-sm px-[31px] text-primary !py-0 hover:text-white w-[130px]'
      >
        Subscribe
      </Button>

      <Toast
        {...toast}
        onBlur={resetToast}
        onHover={pauseToast}
        isOpen={!!toast.message}
      />
    </form>
  );
};

export default SubscribeForm;
