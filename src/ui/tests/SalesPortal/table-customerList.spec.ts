// import test, { expect } from "@playwright/test";
import { test, expect } from "fixtures/businessSteps.fixture";
import { generateCustomerData } from "data/customers/generateCustomerData";
import { NOTIFICATIONS } from "data/notifications.data";
import _ from "lodash";
import { AddNewCustomerPage } from "ui/pages/customers/add-new-customer.page";
import { CustomersPage } from "ui/pages/customers/customers.page";
import { HomePage } from "ui/pages/home.page";
import { SignInPage } from "ui/pages/signIn.page";
import { SALES_PORTAL_URL, USER_LOGIN, USER_PASSWORD } from "config/environment";

test.describe("[UI] [Sales Portal] [Customers]", async () => {
  test("Should check created customer in table", async ({ page }) => {
    //Precondition
    const signInPage = new SignInPage(page);
    const homePage = new HomePage(page);
    const customersPage = new CustomersPage(page);
    const addNewCustomerPage = new AddNewCustomerPage(page);

    //Sign IN
    await page.goto(SALES_PORTAL_URL);
    await signInPage.fillCredentials({ email: USER_LOGIN, password: USER_PASSWORD });
    await signInPage.clickLoginButton();

    await homePage.waitForOpened();
    await homePage.clickModuleButton("Customers");
    await customersPage.waitForOpened();
    await customersPage.clickAddNewCustomer();
    await addNewCustomerPage.waitForOpened();
    const data = generateCustomerData();
    await addNewCustomerPage.fillInputs(data);
    await addNewCustomerPage.clickSaveNewCustomer();
    await customersPage.waitForOpened();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);

    //Act
    await expect(customersPage.tableRowByEmail(data.email)).toBeVisible();

    //Assert
    // await expect.soft(customersPage.emailCell(data.email)).toHaveText(data.email);
    // await expect.soft(customersPage.nameCell(data.email)).toHaveText(data.name);
    // await expect.soft(customersPage.countryCell(data.email)).toHaveText(data.country);

    //сравнивает полученные данные клиента (actualCustomerData) с новым объектом, созданным из исходных данных
    const actualCustomerData = await customersPage.getCustomerData(data.email);
    expect(actualCustomerData).toEqual(
      _.pick(data, ["email", "name", "country"]) //возвращает новый объект, содержащий только указанные поля из исходного
    );

    // вывести массив объектов из всей таблицы
    const table = await customersPage.getTabeData();
    console.log(table);

    await customersPage.clickDeleteCustomer(data.email);
  });

  test("Should check filtered by country table data", async ({ customersPage, homePage, loginAsLocalUser }) => {
    //Precondition
    // await page.goto(SALES_PORTAL_URL);
    // await page.locator("#emailinput").fill(USER_LOGIN);
    // await page.locator("#passwordinput").fill(USER_PASSWORD);
    // await page.getByRole("button", { name: "Login" }).click();

    // await homePage.waitForOpened();
    await loginAsLocalUser();
    await homePage.clickModuleButton("Customers");
    await customersPage.waitForOpened();
    await customersPage.clickFilter();
    // await customersPage.filterModal.waitForOpened();
    const countriesToCheck = ["USA", "Belarus", "Germany"];
    await customersPage.filterModal.checkFilters(...countriesToCheck);
    await customersPage.filterModal.clickApply();
    await customersPage.filterModal.waitForClosed();
    await customersPage.waitForOpened();
    const actualTableData = await customersPage.getTabeData();
    //каждая строка в таблице (actualTableData) имеет значение поля country, которое входит в список countriesToCheck.
    expect(
      actualTableData.every((row) => countriesToCheck.includes(row.country)), //проверяет, удовлетворяют ли все элементы массива заданному условию.
      `Expect table to contain only customers from ${countriesToCheck.join(", ")}` // текст отобразится, если тест провалится
    ).toBe(true);
  });

  // test("Should check filtered by country table data", async ({ page, pages }) => {
  //   //Precondition
  //   await page.goto(SALES_PORTAL_URL);
  //   await page.locator("#emailinput").fill(USER_LOGIN);
  //   await page.locator("#passwordinput").fill(USER_PASSWORD);
  //   await page.getByRole("button", { name: "Login" }).click();

  //   await pages.homePage.waitForOpened();
  //   await pages.homePage.clickModuleButton("Customers");
  //   await pages.customersPage.waitForOpened();
  //   await pages.customersPage.clickFilter();
  //   await pages.customersPage.filterModal.waitForOpened();
  //   const countriesToCheck = ["USA", "Belarus", "Germany"];
  //   await pages.customersPage.filterModal.checkFilters(...countriesToCheck);
  //   await pages.customersPage.filterModal.clickApply();
  //   await pages.customersPage.filterModal.waitForClosed();
  //   await pages.customersPage.waitForOpened();
  //   const actualTableData = await pages.customersPage.getTabeData();
  //   expect(
  //     actualTableData.every((row) => countriesToCheck.includes(row.country)),
  //     `Expect table to contain only customers from ${countriesToCheck.join(", ")}`
  //   ).toBe(true);
  // });
});
