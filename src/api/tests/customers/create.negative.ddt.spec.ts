import { test, expect } from "fixtures/contollers.fixture";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateSchema } from "utils/validations/schemaValidation";
import { validateResponse } from "utils/validations/responseValidation";
import { regInvalidTestData } from "data/customers/create.invalid.data";
import { invalidCreationCustomerSchema } from "data/schemas/customers/invalidCreation.customer";
import { ICustomer } from "types/customer.types";

test.describe("[API] [Customers] [Create] Negative tests", () => {
  let authToken = "";

  //login
  test.beforeAll(async ({ loginController }) => {
    const sigInResponse = await loginController.signIn({
      username: USER_LOGIN,
      password: USER_PASSWORD,
    });
    const headers = sigInResponse.headers;
    authToken = headers["authorization"];
    expect.soft(authToken).toBeTruthy();
    //валидация ответа >> вынесли ErrorMessage / IsSuccess, response.status в отдельную функцию validateResponse
    validateResponse(sigInResponse, STATUS_CODES.OK, true, null);
  });

  //DDT negative tests
  regInvalidTestData.forEach(({ testName, invalidCreationCustomerData, message, statusCode }) => {
    test(testName, async ({ customersController }) => {
      //создание customer
      //type assertion: Приводим Partial<ICustomer> к ICustomer,чтобы не было ошибки в create из-за отсутвия некоторых полей в тестах
      const customerResponse = await customersController.create(invalidCreationCustomerData as ICustomer, authToken);

      //валидация json-схемы
      validateSchema(invalidCreationCustomerSchema, customerResponse.body);
      //asserts
      expect.soft(customerResponse.status).toBe(statusCode);
      expect.soft(customerResponse.body.ErrorMessage).toBe(message);
      expect.soft(customerResponse.body.IsSuccess).toBe(false);
    });
  });
});
