import { MANUFACTURER } from "data/products/manufacturer.data";
import { IResponseFields, productSortField, sortDirection } from "./api.types";

export interface IProduct {
  name: string;
  amount: number;
  price: number;
  manufacturer: MANUFACTURER;
  notes?: string;
}
export interface IProductFromResponse extends IProduct {
  _id: string;
  createdOn: string;
}

export interface IProductResponse extends IResponseFields {
  Product: IProductFromResponse;
}

export interface IProductsResponse extends IResponseFields {
  Products: IProductFromResponse[];
  sorting: {
    sortField: productSortField;
    sortOrder: sortDirection;
  };
}

//объект, который имеет только три свойства из исходного типа IProduct
export type IProductInTable = Pick<IProduct, "name" | "price" | "manufacturer">;
