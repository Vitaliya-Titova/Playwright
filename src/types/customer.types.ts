import { COUNTRIES } from "data/customers/countries.data";

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
//объект, который имеет только три свойства из исходного типа ICustomer
export type ICustomerInTable = Pick<ICustomer, "email" | "country" | "name">;
