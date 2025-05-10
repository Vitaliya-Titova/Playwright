import test, { expect } from "@playwright/test";
import { apiConfig } from "config/api-config";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { generateCustomerData } from "data/customers/generateCustomerData";
import { customersAllSchema } from "data/schemas/customers/customersAll.schema";
import { STATUS_CODES } from "data/statusCodes";
import { validateSchema } from "utils/validations/schemaValidation";

//smoke test без учета фильтрационных параметров
test.describe("[API] [Customers] [Get All Customers ]", () => {
  test("Should get All Customers without params", async ({ request }) => {
    //login
    const loginResponse = await request.post(apiConfig.BASE_URL + apiConfig.ENDPOINTS.LOGIN, {
      data: { username: USER_LOGIN, password: USER_PASSWORD },
      headers: {
        "content-type": "application/json",
      },
    });
    const headersResponse = loginResponse.headers();
    const authToken = headersResponse["authorization"];
    expect.soft(loginResponse.status()).toBe(STATUS_CODES.OK);

    //создание нового customer
    const customerData = generateCustomerData();
    const customerResponse = await request.post(apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMERS, {
      data: customerData,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    //проверка создания customer
    const customerBody = await customerResponse.json();
    expect.soft(customerResponse.status()).toBe(STATUS_CODES.CREATED);

    //отправка  GET запроса для получения всех customers(без парам)
    const getResponse = await request.get(apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMERS, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "content-type": "application/json",
      },
    });

    //asserts
    const bodyResponseAllCustomers = await getResponse.json();
    // Валидация схемы ответа
    validateSchema(customersAllSchema, bodyResponseAllCustomers);
    // Проверка статуса GET запроса
    expect.soft(getResponse.status()).toBe(STATUS_CODES.OK);
    // Проверка тела ответа (наличие созданного customer in arr)
    //1var
    // проверяем ч/з some(есть ли хотя бы один true ) что есть хоть  один  customer-obj с ключом id, email,  name (выбрала основные поля)
    const isCustomerPresentId = bodyResponseAllCustomers.Customers.some((customer: { _id: string }) => customer._id === customerBody.Customer._id);
    expect.soft(isCustomerPresentId).toBe(true);
    const isCustomerPresentEmail = bodyResponseAllCustomers.Customers.some((customer: { email: string }) => customer.email === customerBody.Customer.email);
    expect.soft(isCustomerPresentEmail).toBe(true);
    const isCustomerPresentName = bodyResponseAllCustomers.Customers.some((customer: { name: string }) => customer.name === customerBody.Customer.name);
    expect.soft(isCustomerPresentName).toBe(true);
    //2var
    // const newCustomer = bodyResponseAllCustomers.Customers.find((customer: { email: string }) => customer.email === customerData.email);
    // expect.soft(newCustomer).toMatchObject({ ...customerBody.Customer });
    const newCustomer = bodyResponseAllCustomers.Customers.find((customer: { _id: string }) => customer._id === customerBody.Customer._id);
    expect.soft(newCustomer).toMatchObject({
      email: customerData.email,
      name: customerData.name,
      city: customerData.city,
      country: customerData.country,
      flat: customerData.flat,
      house: customerData.house,
      notes: customerData.notes,
    });
    //3var
    const { _id, createdOn, ...rest } = newCustomer;
    expect.soft(rest).toEqual(customerData);

    expect.soft(bodyResponseAllCustomers.ErrorMessage).toBe(null);
    expect.soft(bodyResponseAllCustomers.IsSuccess).toBe(true);

    // Удаление созданного customer
    const response = await request.delete(apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMER_BY_ID(customerBody.Customer._id), {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    expect.soft(response.status()).toBe(STATUS_CODES.DELETED);
  });
});
