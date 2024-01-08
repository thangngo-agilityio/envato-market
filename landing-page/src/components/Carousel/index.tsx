import isEqual from 'react-fast-compare';
import { Carousel as CarouselLib } from 'react-responsive-carousel';
import { memo } from 'react';

// Styles
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '@app/styles/carousel.css';

type TCarouselProps = {
  images: string[];
};

const Carousel = ({ images }: TCarouselProps): JSX.Element => (
  <div className='col-span-12 nearLg:col-span-7'>
    <CarouselLib
      infiniteLoop
      autoPlay
      interval={20000}
      showArrows={false}
      showIndicators={false}
      showStatus={false}
      width='100%'
    >
      {images.map((image) => (
        <img
          src={image}
          key={image}
          width={250}
          height={250}
          className='thumb-image'
        />
      ))}
    </CarouselLib>
  </div>
);

const CarouselMemorized = memo(Carousel, isEqual);

export default CarouselMemorized;
