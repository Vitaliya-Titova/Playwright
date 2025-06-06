import { test, expect } from "fixtures/contollers.fixture";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { customerSchema } from "data/schemas/customers/customer.schema";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateSchema } from "utils/validations/schemaValidation";
import { validateResponse } from "utils/validations/responseValidation";
import { regValidTestData } from "data/customers/create.valid.data";
import { TAGS } from "data/tages";

test.describe("[API] [Customers] [Create] Positive tests", () => {
  let id = "";
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

  //DDT positive tests
  regValidTestData.forEach(({ testName, validCreationCustomerData }) => {
    test(testName, { tag: [TAGS.API, TAGS.REGRESSION] }, async ({ customersController }) => {
      //создание customer
      const customerResponse = await customersController.create(validCreationCustomerData, authToken);
      id = customerResponse.body.Customer._id;
      //валидация json-схемы
      test.step("Validate  response JSON schema", async () => {
        validateSchema(customerSchema, customerResponse.body);
      });
      //asserts
      test.step("Check successful customer creation via API", async () => {
        validateResponse(customerResponse, STATUS_CODES.CREATED, true, null);
        expect.soft(customerResponse.body.Customer).toMatchObject({ ...validCreationCustomerData });
      });
    });
  });

  //удаление созданного customer
  //after хуки выполняются после завершения теста
  test.afterEach(async ({ customersController }) => {
    if (!id) return;
    const response = await customersController.delete(id, authToken);
    expect.soft(response.status).toBe(STATUS_CODES.DELETED);
  });
});
