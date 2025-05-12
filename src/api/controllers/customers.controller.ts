import { RequestApi } from "api/apiClients/request";
import { apiConfig } from "config/api-config";
import { IRequestOptions } from "types/api.types";
import { ICustomer, ICustomerResponse, ICustomersResponse } from "types/customer.types";
import { convertRequestParams } from "utils/requestParams";

//описывает работу с customers
export class CustomersController {
  //связываем с RequestApi(класс по отправке запросов)
  constructor(private request = new RequestApi()) {}

  //create customer
  async create(body: ICustomer, token: string) {
    const options: IRequestOptions = {
      url: apiConfig.ENDPOINTS.CUSTOMERS,
      method: "post",
      data: body,
      //постоянные headers
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await this.request.send<ICustomerResponse>(options);
  }
  //create customer with partial fields
  async createMissingFields(body: Partial<ICustomer>, token: string) {
    const options: IRequestOptions = {
      url: apiConfig.ENDPOINTS.CUSTOMERS,
      method: "post",
      data: body,
      //постоянные headers
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await this.request.send<ICustomerResponse>(options);
  }

  //получение customer по id
  async getById(id: string, token: string) {
    const options: IRequestOptions = {
      url: apiConfig.ENDPOINTS.CUSTOMER_BY_ID(id),
      method: "get",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await this.request.send<ICustomerResponse>(options);
  }
  //получение всех customers + фильтр парам в урле
  async getAll(token: string, params?: Record<string, string>) {
    const options: IRequestOptions = {
      url: apiConfig.ENDPOINTS.CUSTOMERS + (params ? convertRequestParams(params) : ""),
      method: "get",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await this.request.send<ICustomersResponse>(options);
  }

  //обновление данных customer по его id
  async update(id: string, body: ICustomer, token: string) {
    const options: IRequestOptions = {
      url: apiConfig.ENDPOINTS.CUSTOMER_BY_ID(id),
      method: "put",
      data: body,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await this.request.send<ICustomerResponse>(options);
  }

  //удаление customer по его id
  async delete(id: string, token: string) {
    const options: IRequestOptions = {
      url: apiConfig.ENDPOINTS.CUSTOMER_BY_ID(id),
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await this.request.send<null>(options);
  }
}
