import test, { expect } from "@playwright/test";
import { apiConfig } from "config/api-config";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { generateCustomerData } from "data/customers/generateCustomerData";
import { customerSchema } from "data/schemas/customers/customer.schema";
import { STATUS_CODES } from "data/statusCodes";
import { validateSchema } from "utils/validations/schemaValidation";

test.describe("[API] [Customers] [Get By Id]", () => {
  test("Should get created customer by id", async ({ request }) => {
    //login
    const loginResponse = await request.post(apiConfig.BASE_URL + apiConfig.ENDPOINTS.LOGIN, {
      data: { username: USER_LOGIN, password: USER_PASSWORD },
      headers: {
        "content-type": "application/json",
      },
    });
    const headers = loginResponse.headers();
    const token = headers["authorization"];
    expect.soft(loginResponse.status()).toBe(STATUS_CODES.OK);

    //создание нового customer
    const customerData = generateCustomerData();
    const customerResponse = await request.post(apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMERS, {
      data: customerData,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    //проверка создания customer
    const customerBody = await customerResponse.json();
    expect.soft(customerResponse.status()).toBe(STATUS_CODES.CREATED);

    //отправка  GET запроса для получения созданного customer по ID
    const getResponse = await request.get(apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMER_BY_ID(customerBody.Customer._id), {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    });

    const body = await getResponse.json();
    // Валидация схемы ответа
    validateSchema(customerSchema, body);
    // Проверка статуса GET запроса
    expect.soft(getResponse.status()).toBe(STATUS_CODES.OK);
    // Проверка тела ответа (соответствие созданному customer)
    expect.soft(body.Customer).toMatchObject({ ...customerBody.Customer });
    expect.soft(body.ErrorMessage).toBe(null);
    expect.soft(body.IsSuccess).toBe(true);

     // Удаление созданного customer
    const response = await request.delete(apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMER_BY_ID(customerBody.Customer._id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect.soft(response.status()).toBe(STATUS_CODES.DELETED);
  });
});
