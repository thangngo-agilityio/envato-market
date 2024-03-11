import dayjs from 'dayjs';

// Types
import { StatusProduct, TProduct } from '@/lib/interfaces';

// Utils
import { formatDecimalNumber, formatUppercaseFirstLetter } from '.';

// Constants
import { IMAGES, TIME_FORMAT } from '../constants';

/**
 * Convert data show for home page
 * @param products
 * @returns
 */
export const formatProductResponse = (products: TProduct[] = []) =>
  products.map((product) => {
    const {
      _id,
      name,
      amount,
      currency,
      createdAt,
      description,
      imageURLs,
      stock,
    } = product;

    return {
      id: _id,
      name: formatUppercaseFirstLetter(name),
      description: formatUppercaseFirstLetter(description),
      date: dayjs(createdAt).format(TIME_FORMAT),
      imageURLs: imageURLs || IMAGES.BIG_AVATAR.url,
      amount: `${currency}${formatDecimalNumber(+amount)}`,
      stock: `${stock}`,
      productStatus: stock > 0 ? StatusProduct.IN_STOCK : StatusProduct.SOLD,
    };
  });
