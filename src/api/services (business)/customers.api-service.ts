import { APIRequestContext, expect } from "@playwright/test";
import { CustomersController } from "api/controllers/customers.controller";
import { generateCustomerData } from "data/customers/generateCustomerData";
import { STATUS_CODES } from "data/statusCodes";
import { ICustomer } from "types/customer.types";
import { logStep } from "utils/reporter.utils";
import { validateResponse } from "utils/validations/responseValidation";

//CustomersApiService упрощает процесс создания новых клиентов через API в тестах,
//скрывает детали формирования тела запроса и валидации базового ответа.
export class CustomersApiService {
  controller: CustomersController;
  constructor(request: APIRequestContext) {
    this.controller = new CustomersController();
  }
  //метод создает кастомера, и валидирует его. Отдает объект кастомера
  @logStep("Create Customer via API")
  async create(token: string, customData?: ICustomer) {
    const body = generateCustomerData(customData);
    const response = await this.controller.create(body, token);
    validateResponse(response, STATUS_CODES.CREATED, true, null);
    return response.body.Customer;
  }
}
