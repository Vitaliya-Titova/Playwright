import { test, expect } from "@playwright/test";
import { generateCustomerData } from "data/customers/generateCustomerData";
import { NOTIFICATIONS } from "data/notifications.data";
import { signInData } from "data/signIn.data";
import { AddNewCustomerPage } from "ui/pages/customers/add-new-customer.page";
import { CustomersPage } from "ui/pages/customers/customers.page";
import { HomePage } from "ui/pages/home.page";
import { SignInPage } from "ui/pages/signIn.page";

test.describe("[E2E] SignIn and Customer Creation", () => {
  test("Should Sign in and Create customer", async ({ page }) => {
    const signInPage = new SignInPage(page);
    const homePage = new HomePage(page);
    const customersPage = new CustomersPage(page);
    const addNewCustomerPage = new AddNewCustomerPage(page);

    //Sign IN
    await page.goto("https://anatoly-karpovich.github.io/aqa-course-project/#");
    await signInPage.fillCredentials(signInData);
    await signInPage.clickLoginButton();

    //Go to Customer Page and create Customer

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
    await customersPage.waitForOpened();
    await customersPage.checkNewCustomer(data.email, data.name, data.country);
  });
});
