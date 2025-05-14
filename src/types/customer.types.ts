import { COUNTRIES } from "data/customers/countries.data";
import { customersSortField, IResponseFields, sortDirection } from "./api.types";
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
  sorting: {
    sortField: customersSortField;
    sortOrder: sortDirection;
  };
}
export interface ICreateInvalidDataCustomer {
  testName: string;
  message: string;
  invalidCreationCustomerData: Partial<ICustomer>;
  statusCode: STATUS_CODES;
}

export interface ICreateValidDataCustomer {
  testName: string;
  validCreationCustomerData: ICustomer;
}

//объект, который имеет только три свойства из исходного типа ICustomer
export type ICustomerInTable = Pick<ICustomer, "email" | "country" | "name">;
