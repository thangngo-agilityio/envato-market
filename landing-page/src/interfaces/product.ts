export interface IProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  currency: string;
  imageURLs: string[];
  amount: number;
  stock: number;
  createdAt: number;
  updatedAt: number;
}

export interface IProductInCart
  extends Pick<IProduct, 'id' | 'name' | 'currency' | 'amount'> {
  productId: string;
  imageURL: string;
  quantity: number;
}
