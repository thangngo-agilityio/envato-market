import { Image, ImageProps } from '@chakra-ui/react';
import { IMAGES } from '@/lib/constants';

interface FallbackImageProps extends ImageProps {
  fallbackSrc?: string;
  fallbackStrategy?: 'onError';
}

const FallbackImage = ({
  fallbackSrc = IMAGES.FALLBACK.url,
  fallbackStrategy = 'onError',
  ...props
}: FallbackImageProps) => (
  <Image
    {...props}
    fallbackStrategy={fallbackStrategy}
    fallbackSrc={fallbackSrc}
  />
);

export default FallbackImage;
