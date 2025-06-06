import { generateCustomerData } from "data/customers/generateCustomerData";
import { EMPTY_TABLE_ROW_TEXT, NOTIFICATIONS } from "data/notifications.data";
import { TAGS } from "data/tages";
import { expect, test } from "fixtures/businessSteps.fixture";

test.describe("[UI] [Sales Portal] [Customers]", async () => {
  test(
    "Should delete customer on Edit Customer page",
    { tag: [TAGS.UI, TAGS.SMOKE, TAGS.REGRESSION] },
    async ({
      // loginAsLocalUser,
      homePage,
      customersPage,
      addNewCustomerPage,
      editCustomerPage,
    }) => {
      //await loginAsLocalUser(); - заменяем на контекст логин
      await homePage.openPortal();
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

      await customersPage.clickTableAction(data.email, "edit");
      await editCustomerPage.waitForOpened();
      await editCustomerPage.clickDeleteCustomer();
      await editCustomerPage.deleteCustomerModal.waitForOpened();
      await editCustomerPage.deleteCustomerModal.clickDelete();
      await editCustomerPage.deleteCustomerModal.waitForClosed();
      await editCustomerPage.waitForOpened();
      await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_DELETED);
      await test.step("Verify customer is deleted and not visible in table on Customers Page", async () => {
        await expect(customersPage.tableRowByEmail(data.email)).not.toBeVisible();
        //отсутсвтует удаленный юзер в таблице через поиск
        await customersPage.search(data.email);
        await expect(customersPage.emptyTableRow).toHaveText(EMPTY_TABLE_ROW_TEXT);
      });
    }
  );

  test(
    "Should delete customer on Customers page",
    { tag: [TAGS.UI, TAGS.SMOKE, TAGS.REGRESSION] },
    async ({ homePage, customersPage, addNewCustomerPage }) => {
      //await loginAsLocalUser(); - заменяем на контекст логин
      await homePage.openPortal();
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

      await customersPage.clickTableAction(data.email, "delete");
      await customersPage.deleteCustomerModal.waitForOpened();
      await customersPage.deleteCustomerModal.clickDelete();

      await customersPage.deleteCustomerModal.waitForClosed();
      await customersPage.waitForOpened();
      await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_DELETED);

      await expect(customersPage.tableRowByEmail(data.email)).not.toBeVisible();
      await customersPage.search(data.email);
      await expect(customersPage.emptyTableRow).toHaveText(EMPTY_TABLE_ROW_TEXT);
    }
  );
});
