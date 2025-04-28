// Создать тест сьют используя DDT (Data-Driven Testing - тестовые данные хранятся отдельно от тестового скрипта)
// подход с негативными тест-кейсами по регистрации на сайте
// https://anatoly-karpovich.github.io/demo-login-form/

// Требования:
// Страница регистрации:
//   Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
//   Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен

// Страница логина:
//   Username: обязательное
//   Password: обязательное

import test, { expect } from "@playwright/test";

enum Messages {
  REQUIRED_USERNAME = "Username is required",
  REQUIRED_PASSWORD = "Password is required",
  REQUIRED_FIELD = "Credentials are required",
  INVALID_DATA = "Please, provide valid data",
  INVALID_CREDENTIALS = "Invalid credentials",

  USERNAME_TOO_SHORT = "Username should contain at least 3 characters",
  USERNAME_TAKEN = "Username is in use",
  USERNAME_TOO_LONG = "Username can't exceed 40 characters",
  USERNAME_SPACES = "Prefix and postfix spaces are not allowed is username",

  PASSWORD_TOO_SHORT = "Password should contain at least 8 characters",
  PASSWORD_SENSITIVE_LOWER = "Password should contain at least one character in lower case",
  PASSWORD_SENSITIVE_UPPER = "Password should contain at least one character in upper case",
  PASSWORD_TOO_LONG = "Password can't exceed 20 characters",

  REGISTRATION_SUCCESS = "Successfully registered! Please, click Back to return on login page",
}
interface IRegistrationInvalidData {
  testName: string;
  username: string;
  password: string;
  message: Messages;
}

const regInvalidTestData: IRegistrationInvalidData[] = [
  {
    testName: "Error | Username is empty",
    username: "",
    password: "QWErty123456789",
    message: Messages.REQUIRED_USERNAME,
  },
  {
    testName: "Error | Username contains only spaces",
    username: "             ",
    password: "QWErty12345678",
    message: Messages.USERNAME_SPACES,
  },
  {
    testName: "Error | Password is empty",
    username: "Abcqwertyq",
    password: "",
    message: Messages.REQUIRED_PASSWORD,
  },
  {
    testName: "Error | Password contains only spaces",
    username: "Abcqwerty",
    password: "          ",
    message: Messages.REQUIRED_PASSWORD,
  },
  {
    testName: "Error | Provide invalid data",
    username: "1",
    password: "2",
    message: Messages.INVALID_DATA,
  },
  {
    testName: "Error | Username and password contain only spaces",
    username: "       ",
    password: "        ",
    message: Messages.INVALID_DATA,
  },
  {
    testName: "Error | Username and password are empty",
    username: "",
    password: "",
    message: Messages.INVALID_DATA,
  },
  {
    testName: "Error | Password not contains letters",
    username: "Abcqw ertyzc",
    password: "123456#$%^",
    message: Messages.PASSWORD_SENSITIVE_LOWER,
  },
  {
    testName: "Error | Username should contain at least 3 characters",
    username: "A",
    password: "QWErty12345678",
    message: Messages.USERNAME_TOO_SHORT,
  },
  {
    testName: "Error | Username can't exceed 40 characters",
    username:
      "AAAAAAAAAAAAAAAAbbbbbbbbbbbbbDDDDDDDDDDDDDeeeeeeeeeeeeeeFFFFFFFFFFF",
    password: "QWErty12345678",
    message: Messages.USERNAME_TOO_LONG,
  },
  {
    testName: "Error |  Username starts with spaces",
    username: "  Abcqwermy",
    password: "QWErty12345678",
    message: Messages.USERNAME_SPACES,
  },
  {
    testName: "Error | Username ends with spaces",
    username: "Abcqwenrty ",
    password: "QWErty12345678",
    message: Messages.USERNAME_SPACES,
  },
  {
    testName: "Error | Password should contain at least 8 characters",
    username: "Qwertt",
    password: "QWE",
    message: Messages.PASSWORD_TOO_SHORT,
  },
  {
    testName:
      "Error | Password should contain at least one character in lower cases",
    username: "Qwertyc",
    password: "QWERTYQWERT123",
    message: Messages.PASSWORD_SENSITIVE_LOWER,
  },
  {
    testName:
      "Error | Password should contain at least one character in upper cases",
    username: "Qwertyc",
    password: "qwertyuio123",
    message: Messages.PASSWORD_SENSITIVE_UPPER,
  },
  {
    testName: "Error | Password can't exceed 20 characters",
    username: "Qwerty12",
    password: "qwertyqwertyqwertyqwertyqwertyqwerty",
    message: Messages.PASSWORD_TOO_LONG,
  },
];

test.describe("[UI] Registration Form – Negative Tests (DDT)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://anatoly-karpovich.github.io/demo-login-form/");
    await page.locator("#registerOnLogin").click();
    await page
      .locator("#userNameOnRegister")
      .evaluate((el) => el.removeAttribute("maxlength"));
    await page
      .locator("#passwordOnRegister")
      .evaluate((el) => el.removeAttribute("maxlength"));
  });

  regInvalidTestData.forEach(({ testName, username, password, message }) => {
    test(testName, async ({ page }) => {
      const form = page.locator(".registerForm");
      await form.locator("#userNameOnRegister").fill(username);
      await form.locator("#passwordOnRegister").fill(password);
      await form.locator("#register").click();
      await expect(form.locator("#errorMessageOnRegister")).toHaveText(message);
    });
  });
});
