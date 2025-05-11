import { IResponseFields } from "./api.types";
import { ICustomerFromResponse } from "./customer.types";

export interface ICredentials {
  username: string;
  password: string;
}

// "IsSuccess", "ErrorMessage" из IResponseFields; User: object  из  ICustomerFromResponse
export interface ILoginFromResponse extends IResponseFields {
  User: object;
}
