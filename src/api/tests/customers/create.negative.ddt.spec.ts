import { test, expect } from "fixtures/contollers.fixture";
import { apiConfig } from "config/api-config";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { generateCustomerData } from "data/customers/generateCustomerData";
import { customerSchema } from "data/schemas/customers/customer.schema";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateSchema } from "utils/validations/schemaValidation";
import { validateResponse } from "utils/validations/responseValidation";
import { SignInController } from "api/controllers/signIn.controller";
import { ILoginResponseHeaders } from "types/signIn.types";
import { regInvalidTestData } from "data/customers/create.invalid.data";
import { ERROR_NOTIFICATIONS } from "data/notifications.data";
import { invalidCreationCustomerSchema } from "data/schemas/customers/invalidCreation.customer";

test.describe("[API] [Customers] [Create]", () => {
  let authToken = "";
  const signInController = new SignInController();

  //login
  test.beforeAll(async ({}) => {
    const sigInResponse = await signInController.signIn({
      username: USER_LOGIN,
      password: USER_PASSWORD,
    });
    const expectedUser = {
      _id: "6804f272d006ba3d475fb3e0",
      username: "Vita",
      firstName: "Vitaliya",
      lastName: "Tsitova",
      roles: ["USER"],
      createdOn: "2025/04/20 13:11:14",
    };

    //Достаем хедеры
    const headers = sigInResponse.headers as ILoginResponseHeaders;
    // Достаем токен из хедеров
    authToken = headers["authorization"];
    // Проверка наличия токена
    expect.soft(authToken).toBeTruthy();
    // Проверка данных пользователя
    expect.soft(sigInResponse.body.User).toMatchObject(expectedUser);
    //валидация ответа >> вынесли ErrorMessage / IsSuccess, response.status в отдельную функцию validateResponse
    validateResponse(sigInResponse, STATUS_CODES.OK, true, null);
  });

  //DDT negative tests
  regInvalidTestData.forEach(({ testName, invalidCreationCustomerData, message, statusCode }) => {
    test(testName, async ({ customersController }) => {
      //создание customer
      const customerResponse = await customersController.createMissingFields(invalidCreationCustomerData, authToken);

      //валидация json-схемы
      validateSchema(invalidCreationCustomerSchema, customerResponse.body);
      expect.soft(customerResponse.status).toBe(statusCode);
      expect.soft(customerResponse.body.ErrorMessage).toBe(message);
      expect.soft(customerResponse.body.IsSuccess).toBe(false);
    });
  });
});
