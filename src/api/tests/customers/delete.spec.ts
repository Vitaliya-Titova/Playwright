import test, { expect } from "@playwright/test";
import { apiConfig } from "config/api-config";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { generateCustomerData } from "data/customers/generateCustomerData";
import { STATUS_CODES } from "data/statusCodes";

test.describe("[API] [Customers] [Delete]", () => {
  //login
  test("Should delete customer", async ({ request }) => {
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

    //отправка запроса delete на удаление новосозданного customer
    const response = await request.delete(apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMER_BY_ID(customerBody.Customer._id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //проверка, что созданный customer удален
    const deleteBody = await response.text();
    expect.soft(response.status()).toBe(STATUS_CODES.DELETED);
    expect.soft(deleteBody).toBe(""); //body пустая строка после удаления
  });
});
