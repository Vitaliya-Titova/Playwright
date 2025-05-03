import { faker } from "@faker-js/faker";
import { generateCustomerData } from "data/customers/generateCustomerData";
import { NOTIFICATIONS } from "data/notifications.data";
import { test, expect } from "fixtures/businessSteps.fixture";

test("Edit customer with smoke invalid data", async ({ loginAsLocalUser, homePage, customersPage, editCustomerPage }) => {
  loginAsLocalUser();
  await homePage.clickModuleButton("Customers");
  await customersPage.waitForOpened();
  await customersPage.clickTableAction("user@domain.com	", "edit");
  await editCustomerPage.waitForOpened();
  await editCustomerPage.fillInputs({
    email: "user@domain.com!",
    // city: "@!#",
    // flat: 11111111111111,
    // house: 1111111111111111111,
    // name: "123!@#",
    // notes: "<>",
    // phone: "123",
    // street: "123!@#",
  });
  const errors = await editCustomerPage.getFormErrors();
  console.log(errors);
});

test.describe("[UI] [Customers] [Edit]", async () => {
  test("Edit customer with smoke valid name", async ({ loginAsLocalUser, homePage, customersPage, editCustomerPage }) => {
    loginAsLocalUser();
    await homePage.clickModuleButton("Customers");
    await customersPage.waitForOpened();
    const editEmail = "Vita_test@domain.com";
    await customersPage.clickTableAction(editEmail, "edit");
    await editCustomerPage.waitForOpened();
    const updatedCustomerData = generateCustomerData({ name: `TestVitaUPDATE ${faker.string.alpha(11)}` });
    const expectedName = updatedCustomerData.name;

    await editCustomerPage.fillInputs({
      // email: "Vita_test@domain.com!",
      // city: "@!#",
      // flat: 11111111111111,
      // house: 1111111111111111111,
      name: expectedName,
      // notes: "<>",
      // phone: "123",
      // street: "123!@#",
    });
    await editCustomerPage.clickSaveChanges();
    //await editCustomerPage.waitForOpened();
    //Act
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_EDIT);

    const actualNameInTable = await customersPage.nameCell(editEmail).textContent();
    expect(actualNameInTable).toBe(expectedName);
  });
});
