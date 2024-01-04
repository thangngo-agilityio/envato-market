import { useRef, type RefObject, useCallback } from 'react';

// Components
import { Input, Button } from '@app/components';

const SubscribeForm = (): JSX.Element => {
  const refInput: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(() => {}, []);

  return (
    <div className='w-full flex mt-3xl lg:mt-0'>
      <Input
        ref={refInput}
        placeholder='Your E-mail'
        size='md'
        variant='secondary'
        className='font-normal flex-1'
      />
      <Button className='text-sm w-[152px]' onclick={handleSubmit}>
        Subscribe
      </Button>
    </div>
  );
};

export default SubscribeForm;
