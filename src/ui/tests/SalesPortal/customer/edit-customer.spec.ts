import { faker } from "@faker-js/faker";
import { generateCustomerData } from "data/customers/generateCustomerData";
import { NOTIFICATIONS } from "data/notifications.data";
import { TAGS } from "data/tages";
import { test, expect } from "fixtures/businessSteps.fixture";

test.describe("[UI] [Customers] [Edit]", async () => {
  test("Edit customer with smoke invalid data", { tag: [TAGS.UI, TAGS.REGRESSION] }, async ({ homePage, customersPage, editCustomerPage }) => {
    // loginAsLocalUser(); - заменяем на контекст логин
    await homePage.openPortal();
    await homePage.clickModuleButton("Customers");
    await customersPage.waitForOpened();
    await customersPage.clickTableAction("test1748264120331@gmail.com", "edit");
    await editCustomerPage.waitForOpened();
    await editCustomerPage.fillInputs({
      email: "test1748264120331@gmail.com!",
      // city: "@!#",
      // flat: 11111111111111,
      // house: 1111111111111111111,
      // name: "123!@#",
      // notes: "<>",
      // phone: "123",
      // street: "123!@#",
    });
    const errors = await editCustomerPage.getFormErrors();
  });

  test.skip(
    "Edit customer with smoke valid name",
    { tag: [TAGS.UI, TAGS.SMOKE, TAGS.REGRESSION] },
    async ({ homePage, customersPage, editCustomerPage }) => {
      // loginAsLocalUser(); - заменяем на контекст логин
      await homePage.openPortal();
      await homePage.clickModuleButton("Customers");
      await customersPage.waitForOpened();
      const editEmail = "Vita_test2@domain.com";
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

      //Act
      await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_EDIT);

      //1v
      const actualNameInTable = await customersPage.nameCell(editEmail).textContent();
      expect(actualNameInTable).toBe(expectedName);
      //2v
      const allCustomersData = await customersPage.getTabeData();
      const foundUpdCustomer = allCustomersData.some((customer) => customer.name === expectedName);
      expect(foundUpdCustomer).toBe(true);
    }
  );
});
