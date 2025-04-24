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
  RequiredUsername = "Username is required",
  RequiredPassword = "Password is required",
  RequiredField = "Credentials are required",
  InvalidData = "Please, provide valid data",
  InvalidCredentials = "Invalid credentials",

  UsernameTooShort = "Username should contain at least 3 characters",
  UsernameTaken = "Username is in use",
  UsernameTooLong = "Username can't exceed 40 characters",
  UsernameSpaces = "Prefix and postfix spaces are not allowed is username",

  PasswordTooShort = "Password should contain at least 8 characters",
  PasswordSensitiveLower = "Password should contain at least one character in lower case",
  PasswordSensitiveUpper = "Password should contain at least one character in upper case",
  PasswordTooLong = "Password can't exceed 20 characters",

  RegistrationSuccess = "Successfully registered! Please, click Back to return on login page",
}
interface IRegInvalidData {
  testName: string;
  username: string;
  password: string;
  message: Messages;
}

const regInvalidTestData: IRegInvalidData[] = [
  {
    testName: "Error | Username is empty",
    username: "",
    password: "QWErty123456789",
    message: Messages.RequiredUsername,
  },
  {
    testName: "Error | Username contains only spaces",
    username: "             ",
    password: "QWErty12345678",
    message: Messages.UsernameSpaces,
  },
  {
    testName: "Error | Password is empty",
    username: "Abcqwertyq",
    password: "",
    message: Messages.RequiredPassword,
  },
  {
    testName: "Error | Password contains only spaces",
    username: "Abcqwerty",
    password: "          ",
    message: Messages.RequiredPassword,
  },
  {
    testName: "Error | Provide invalid data",
    username: "1",
    password: "2",
    message: Messages.InvalidData,
  },
  {
    testName: "Error | Username and password contain only spaces",
    username: "       ",
    password: "        ",
    message: Messages.InvalidData,
  },
  {
    testName: "Error | Username and password are empty",
    username: "",
    password: "",
    message: Messages.InvalidData,
  },
  {
    testName: "Error | Password not contains letters",
    username: "Abcqw ertyzc",
    password: "123456#$%^",
    message: Messages.PasswordSensitiveLower,
  },
  {
    testName: "Error | Username should contain at least 3 characters",
    username: "A",
    password: "QWErty12345678",
    message: Messages.UsernameTooShort,
  },
  {
    testName: "Error | Username can't exceed 40 characters",
    username:
      "AAAAAAAAAAAAAAAAbbbbbbbbbbbbbDDDDDDDDDDDDDeeeeeeeeeeeeeeFFFFFFFFFFF",
    password: "QWErty12345678",
    message: Messages.UsernameTooLong,
  },
  {
    testName: "Error |  Username starts with spaces",
    username: "  Abcqwermy",
    password: "QWErty12345678",
    message: Messages.UsernameSpaces,
  },
  {
    testName: "Error | Username ends with spaces",
    username: "Abcqwenrty ",
    password: "QWErty12345678",
    message: Messages.UsernameSpaces,
  },
  {
    testName: "Error | Password should contain at least 8 characters",
    username: "Qwertt",
    password: "QWE",
    message: Messages.PasswordTooShort,
  },
  {
    testName:
      "Error | Password should contain at least one character in lower cases",
    username: "Qwertyc",
    password: "QWERTYQWERT123",
    message: Messages.PasswordSensitiveLower,
  },
  {
    testName:
      "Error | Password should contain at least one character in upper cases",
    username: "Qwertyc",
    password: "qwertyuio123",
    message: Messages.PasswordSensitiveUpper,
  },
  {
    testName: "Error | Password can't exceed 20 characters",
    username: "Qwerty12",
    password: "qwertyqwertyqwertyqwertyqwertyqwerty",
    message: Messages.PasswordTooLong,
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
