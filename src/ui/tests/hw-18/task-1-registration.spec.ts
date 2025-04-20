// Разработайте смоук тест-сьют с тестами на REGISTER на странице
// https://anatoly-karpovich.github.io/demo-login-form/

// Требования:
//     Username: обязательное, от 3 до 40 символов включительно,
//      запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
//     Password: обязательное, от 8 до 20 символов включительно,
//      необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен

import { test, expect } from "@playwright/test";

test.describe("[UI] Registration", () => {
  const validCredentials = {
    username: "Tom John 3",
    password: "Qwertyuiop 1",
  };

  test.beforeEach(async ({ page }) => {
    await page.goto("https://anatoly-karpovich.github.io/demo-login-form/");
    await page.locator("#registerOnLogin").click();
  });

  const fieldUsername = "#userNameOnRegister";
  const fieldPassword = "#passwordOnRegister";
  const buttonRegister = "#register";

  test("Register form: Should display required fileds ", async ({ page }) => {
    await expect(page.locator("#registerForm")).toContainText("Registration");
    await expect(page.locator(fieldUsername)).toBeVisible();
    await expect(page.locator(fieldPassword)).toBeVisible();
    await expect(page.locator(buttonRegister)).toBeVisible();
    await expect(page.locator("#backOnRegister")).toBeVisible();
  });

  test("Smoke | Should registrate with valid credentials", async ({ page }) => {
    await page.locator(fieldUsername).fill(validCredentials.username);
    await page.locator(fieldPassword).fill(validCredentials.password);
    await page.locator(buttonRegister).click();

    const notification = page.locator("#errorMessageOnRegister");
    await expect(notification).toContainText(
      "Successfully registered! Please, click Back to return on login page"
    );
  });
});
