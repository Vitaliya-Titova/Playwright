import test, { expect } from "@playwright/test";
import { generateCustomerData } from "data/customers/generateCustomerData";
import { NOTIFICATIONS } from "data/notifications.data";
import { TAGS } from "data/tages";
import { AddNewCustomerPage } from "ui/pages/customers/add-new-customer.page";
import { CustomersPage } from "ui/pages/customers/customers.page";
import { HomePage } from "ui/pages/home.page";

test.describe("[UI] [Sales Portal] [Customers]", async () => {
  test("Should create customer with smoke data", { tag: [TAGS.UI, TAGS.SMOKE, TAGS.REGRESSION] }, async ({ page }) => {
    const homePage = new HomePage(page);
    const customersPage = new CustomersPage(page);
    const addNewCustomerPage = new AddNewCustomerPage(page);
    await page.goto("https://anatoly-karpovich.github.io/aqa-course-project/#");
    // заменяем на контекст логин
    // await page.locator("#emailinput").fill("test@gmail.com");
    // await page.locator("#passwordinput").fill("12345678");
    // await page.getByRole("button", { name: "Login" }).click();

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
    //delete
    await customersPage.clickTableAction(data.email, "delete");
    await customersPage.deleteCustomerModal.waitForOpened();
    await customersPage.deleteCustomerModal.clickDelete();
    await customersPage.deleteCustomerModal.waitForClosed();
    await customersPage.waitForOpened();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_DELETED);
  });

  test("Should NOT create customer with duplicated email", { tag: [TAGS.UI, TAGS.REGRESSION] }, async ({ page }) => {
    const homePage = new HomePage(page);
    const customersPage = new CustomersPage(page);
    const addNewCustomerPage = new AddNewCustomerPage(page);
    await page.goto("https://anatoly-karpovich.github.io/aqa-course-project/#");
    // await page.locator("#emailinput").fill("test@gmail.com");
    // await page.locator("#passwordinput").fill("12345678");
    // await page.getByRole("button", { name: "Login" }).click();

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

    await customersPage.clickAddNewCustomer();
    await addNewCustomerPage.waitForOpened();
    await addNewCustomerPage.fillInputs(generateCustomerData({ email: data.email }));
    await addNewCustomerPage.clickSaveNewCustomer();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_DUPLICATED(data.email));
  });
});
