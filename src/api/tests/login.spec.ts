import { test, expect } from "fixtures/contollers.fixture";
import { apiConfig } from "config/api-config";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { loginSchema } from "data/schemas/login.schema";
import { STATUS_CODES } from "data/statusCodes";
import { validateSchema } from "utils/validations/schemaValidation";
import { TAGS } from "data/tages";

test.describe("[API] [Auth] [Login]]", () => {
  test.skip("Should successfully login with valid credentials", { tag: [TAGS.SMOKE, TAGS.API] }, async ({ request }) => {
    // Запрос на логин
    const loginResponse = await request.post(apiConfig.BASE_URL + apiConfig.ENDPOINTS.LOGIN, {
      data: { username: USER_LOGIN, password: USER_PASSWORD },
      headers: {
        "content-type": "application/json",
      },
    });

    // Assert
    const headers = loginResponse.headers();
    const authToken = headers["authorization"];
    const responseBody = await loginResponse.json();
    const expectedUser = {
      _id: "6804f272d006ba3d475fb3e0",
      username: "Vita",
      firstName: "Vitaliya",
      lastName: "Tsitova",
      roles: ["USER"],
      createdOn: "2025/04/20 13:11:14",
    };
    //валидация json-схемы
    test.step("Validate  response JSON schema", async () => {
      validateSchema(loginSchema, responseBody);
    });

    // Проверка статус кода логина: 200 OK
    expect.soft(loginResponse.status()).toBe(STATUS_CODES.OK);
    // Проверка наличия токена
    expect.soft(authToken).toBeTruthy();
    // Проверка данных пользователя
    expect.soft(responseBody.User).toMatchObject(expectedUser);
    expect.soft(responseBody.User).toHaveProperty("username", USER_LOGIN);
    //expect.soft(responseBody.User).toMatchObject(expectedUser);
    // Проверка отсутствия ошибки
    expect.soft(responseBody.ErrorMessage).toBe(null);
    // Проверка IsSuccess: true
    expect.soft(responseBody.IsSuccess).toBe(true);
  });

  test("Should successfully login with valid credentials and Controller", { tag: [TAGS.SMOKE, TAGS.API] }, async ({ loginController }) => {
    // Запрос на логин
    const sigInResponse = await loginController.signIn({
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
    // Assert
    const responseBody = sigInResponse.body;
    const headers = sigInResponse.headers;
    // Достаем токен из хедеров
    const authToken = headers["authorization"];

    //валидация json-схемы
    test.step("Validate  response JSON schema", async () => {
      validateSchema(loginSchema, responseBody);
    });

    test.step("Validate SignIn response ", async () => {
      // Проверка наличия токена
      expect.soft(authToken).toBeTruthy();
      // Проверка статус кода логина: 200 OK
      expect.soft(sigInResponse.status).toBe(STATUS_CODES.OK);
      // Проверка данных пользователя
      expect.soft(responseBody.User).toMatchObject(expectedUser);
      // Проверка отсутствия ошибки
      expect.soft(responseBody.ErrorMessage).toBe(null);
      // Проверка IsSuccess: true
      expect.soft(responseBody.IsSuccess).toBe(true);
    });
  });
});
/* asserts:
    1. status code
    2. response
    3. token
    4. json schema
    */
