import { test, expect } from "fixtures/contollers.fixture";
import { apiConfig } from "config/api-config";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { generateCustomerData } from "data/customers/generateCustomerData";
import { customerSchema } from "data/schemas/customers/customer.schema";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateSchema } from "utils/validations/schemaValidation";
import { validateResponse } from "utils/validations/responseValidation";

test.describe("[API] [Customers] [Create]", () => {
  let id = "";
  let authToken = "";

  test.skip("Create customer with smoke data", async ({ request }) => {
    // Запрос на логин
    const loginResponse = await request.post(apiConfig.BASE_URL + apiConfig.ENDPOINTS.LOGIN, {
      data: { username: USER_LOGIN, password: USER_PASSWORD },
      headers: {
        "content-type": "application/json",
      },
    });
    const headers = loginResponse.headers();
    authToken = headers["authorization"];
    const body = await loginResponse.json();
    const expectedUser = {
      _id: "6804f272d006ba3d475fb3e0",
      username: "Vita",
      firstName: "Vitaliya",
      lastName: "Tsitova",
      roles: ["USER"],
      createdOn: "2025/04/20 13:11:14",
    };
    // Проверка статус кода логина: 200 OK
    expect.soft(loginResponse.status()).toBe(STATUS_CODES.OK);
    // Проверка наличия токена
    expect.soft(authToken).toBeTruthy();
    // Проверка данных пользователя
    expect.soft(body.User).toMatchObject(expectedUser);
    // Проверка отсутствия ошибки
    expect.soft(body.ErrorMessage).toBe(null);
    // Проверка IsSuccess: true
    expect.soft(body.IsSuccess).toBe(true);

    //создание customer
    const customerData = generateCustomerData();
    const customerResponse = await request.post(apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMERS, {
      data: customerData,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    /* asserts:
    1. status code
    2. response
    3. token
    4. json schema
    */

    const customerBody = await customerResponse.json();

    id = customerBody.Customer._id;

    validateSchema(customerSchema, customerBody); //валидация json-схемы

    // Проверка статуса кода создания
    expect.soft(customerResponse.status()).toBe(STATUS_CODES.CREATED);
    expect.soft(customerBody.Customer).toMatchObject({ ...customerData });
    // expect.soft({ ...customerData }).toMatchObject(_.omit(customerBody.Customer, "_id", "createdOn")); lodash - искл поля "_id", "createdOn"
    expect.soft(body.ErrorMessage).toBe(null);
    expect.soft(body.IsSuccess).toBe(true);

    //afterEach: удаление созданного юзера после теста
    const response = await request.delete(apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMER_BY_ID(id), {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    //простая проверка по статусу, что юзер удален(тк это не оснавная цель для теста)
    expect.soft(response.status()).toBe(STATUS_CODES.DELETED);
  });

  test("Create customer with smoke data and Controller", async ({ loginController, customersController }) => {
    //login
    const sigInResponse = await loginController.signIn({
      username: USER_LOGIN,
      password: USER_PASSWORD,
    });
    const headers = sigInResponse.headers;
    authToken = headers["authorization"];
    expect.soft(authToken).toBeTruthy();
    expect.soft(sigInResponse.status).toBe(STATUS_CODES.OK);

    // Проверка данных пользователя
    // expect.soft(sigInResponse.body.User).toMatchObject(expectedUser);
    // // Проверка отсутствия ошибки
    // expect.soft(sigInResponse.body.ErrorMessage).toBe(null);
    // // Проверка IsSuccess: true
    // expect.soft(sigInResponse.body.IsSuccess).toBe(true);
    //валидация ответа >> вынесли ErrorMessage / IsSuccess, response.status в отдельную функцию validateResponse
    //validateResponse(sigInResponse, STATUS_CODES.OK, true, null);

    const customerData = generateCustomerData();
    //создание customer
    const customerResponse = await customersController.create(customerData, authToken);
    id = customerResponse.body.Customer._id;

    //валидация json-схемы
    validateSchema(customerSchema, customerResponse.body);
    //валидация ответа
    validateResponse(customerResponse, STATUS_CODES.CREATED, true, null);
    expect.soft(customerResponse.body.Customer).toMatchObject({ ...customerData });

    //вынесли ErrorMessage / IsSuccess, response.status в отдельную функцию validateResponse
    // expect.soft(customerResponse.status()).toBe(STATUS_CODES.CREATED);
    // expect.soft(body.ErrorMessage).toBe(null);
    // expect.soft(body.IsSuccess).toBe(true);
  });

  //удаление созданного customer
  //after хуки выполняются после завершения теста
  test.afterEach(async ({ customersController }) => {
    if (!id) return;
    const response = await customersController.delete(id, authToken);
    expect.soft(response.status).toBe(STATUS_CODES.DELETED);
  });
});
