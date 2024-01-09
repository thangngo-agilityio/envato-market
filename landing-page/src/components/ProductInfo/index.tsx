import { useCallback, useMemo, useRef, type FormEventHandler } from 'react';
import { Button } from '..';

type TProductInfoProps = {
  name: string;
  currency: string;
  description: string;
  stock: number;
  amount: number;
};

const ProductInfo = ({
  currency,
  amount,
  name,
  stock,
  description,
}: TProductInfoProps): JSX.Element => {
  const refQuantity = useRef<HTMLInputElement>(null);

  const statusStock = useMemo(() => {
    if (stock <= 0) {
      return {
        title: 'out stock',
        color: 'bg-red-500',
      };
    }

    return { title: 'in stock', color: 'bg-green-500' };
  }, [stock]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <section className='col-span-12 nearLg:col-span-5 mt-[70px] nearLg:mt-0 font-primary'>
      <p className='text-2xl text-sun py-[15px] relative after:absolute after:block after:top-0 after:w-[80px] after:h-[3px] after:bg-sun'>
        {currency}
        {amount}
      </p>

      <h6 className='text-3xl pb-3'>{name}</h6>
      <p className='flex items-center text-xs text-elementary gap-1'>
        <span
          className={`block w-2 h-2 rounded-full ${statusStock.color}`}
        ></span>
        <span>{statusStock.title}</span>
      </p>
      <p className='text-base text-elementary my-12'>{description}</p>
      <form className='flex flex-col gap-14' onSubmit={handleSubmit}>
        <input
          ref={refQuantity}
          defaultValue={1}
          type='number'
          className='bg-desertStorm px-3 h-10 w-[100px] text-center'
        />

        <Button className='w-full sm:w-[280px] md:w-[310px] nearLg:w-full lg:w-[310px] '>
          Add to cart
        </Button>
      </form>
    </section>
  );
};

export default ProductInfo;
