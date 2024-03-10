export type TProduct = {
  _id: string;
  name: string;
  amount: number;
  stock: number;
  description?: string;
  currency?: string;
  createdAt?: string;
  imageURLs: string[];
};
