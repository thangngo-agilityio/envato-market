import { memo, type ImgHTMLAttributes, useState, useEffect } from 'react';
import isEqual from 'react-fast-compare';

type TImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  placeholderSrc?: string;
};

const ImageCustom = ({
  placeholderSrc = '',
  src = '',
  ...props
}: TImageProps): JSX.Element => {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);

  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => setImgSrc(src);
  }, [src]);

  return <img {...{ src: imgSrc, ...props }} />;
};

const ImageMemorized = memo(ImageCustom, isEqual);

export default ImageMemorized;
