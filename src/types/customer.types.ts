import { COUNTRIES } from "data/customers/countries.data";
import { IResponseFields } from "./api.types";
import { STATUS_CODES } from "data/statusCodes";

export interface ICustomer {
  email: string;
  name: string;
  country: COUNTRIES;
  city: string;
  street: string;
  house: number;
  flat: number;
  phone: string;
  notes?: string;
}
export interface ICustomerFromResponse extends ICustomer {
  _id: string;
  createdOn: string;
}

export interface ICustomerResponse extends IResponseFields {
  Customer: ICustomerFromResponse;
}

export interface ICustomersResponse extends IResponseFields {
  Customers: ICustomerFromResponse[];
}
export interface ICreateInvalidDataCustomer {
  testName: string;
  message: string;
  invalidCreationCustomerData: Partial<ICustomer>;
  statusCode: STATUS_CODES;
}

//объект, который имеет только три свойства из исходного типа ICustomer
export type ICustomerInTable = Pick<ICustomer, "email" | "country" | "name">;
