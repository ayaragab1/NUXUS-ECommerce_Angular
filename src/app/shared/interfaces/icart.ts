import { Icategory } from "./icategory";
import { IProduct } from "./iproduct";

export interface Icart {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: Data;
}

interface Data {
  _id: string;
  cartOwner: string;
  products: Product2[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

interface Product2 {
  count: number;
  _id: string;
  product: IProduct;
  price: number;
}

