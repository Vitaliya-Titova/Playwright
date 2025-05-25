import test, { expect } from "@playwright/test";
import { apiConfig } from "config/api-config";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { generateCustomerData } from "data/customers/generateCustomerData";
import { customerSchema } from "data/schemas/customers/customer.schema";
import { STATUS_CODES } from "data/statusCodes";
import { TAGS } from "data/tages";
import { validateSchema } from "utils/validations/schemaValidation";

test.describe("[API] [Customers] [Update]", () => {
  test("Update customer with smoke data", { tag: [TAGS.SMOKE, TAGS.API, TAGS.REGRESSION] }, async ({ request }) => {
    //login
    const loginResponse = await request.post(apiConfig.BASE_URL + apiConfig.ENDPOINTS.LOGIN, {
      data: { username: USER_LOGIN, password: USER_PASSWORD },
      headers: {
        "content-type": "application/json",
      },
    });
    const headers = loginResponse.headers();
    const token = headers["authorization"];
    //проверка статус кода ответа на запрос логина, равен значению 200 ок
    expect.soft(loginResponse.status()).toBe(STATUS_CODES.OK);

    //создание нового customer для обновления
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

    const updateCustomerData = generateCustomerData();
    //отсылаем put запрос с id созданного кастомера и токен
    const updateCustomerResponse = await request.put(apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMER_BY_ID(customerBody.Customer._id), {
      data: updateCustomerData,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const body = await updateCustomerResponse.json();
    test.step("Validate  response JSON schema", async () => {
      validateSchema(customerSchema, body);
    });
    test.step("Verify response updated  customer ", async () => {
      expect.soft(updateCustomerResponse.status()).toBe(STATUS_CODES.OK);
      expect.soft(body.Customer).toMatchObject({ ...updateCustomerData });
      expect.soft(body.ErrorMessage).toBe(null);
      expect.soft(body.IsSuccess).toBe(true);
    });

    //удаление customer
    const response = await request.delete(apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMER_BY_ID(customerBody.Customer._id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect.soft(response.status()).toBe(STATUS_CODES.DELETED);
  });
});
