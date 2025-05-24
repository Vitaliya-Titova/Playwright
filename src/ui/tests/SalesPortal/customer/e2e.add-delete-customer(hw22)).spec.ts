import { generateCustomerData } from "data/customers/generateCustomerData";
import { EMPTY_TABLE_ROW_TEXT, NOTIFICATIONS } from "data/notifications.data";
import { expect, test } from "fixtures/businessSteps.fixture";

test.describe("[UI] [Sales Portal] [Customers]", async () => {
  test("Should add and delete customer on Customer page", async ({ loginAsLocalUser, homePage, customersPage, addNewCustomerPage, editCustomerPage }) => {
    await loginAsLocalUser();
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
    
    //отсутсвтует удаленный юзер в таблице через поиск
    // await customersPage.search(data.email);
    // await expect(customersPage.emptyTableRow).toHaveText(EMPTY_TABLE_ROW_TEXT);

    //отсутсвтует удаленный юзер в таблице
    //получаем массив объектов всех customer
    const allCustomersData = await customersPage.getTabeData();

    // проверяем ч/з some(есть ли хотя бы один true или вернет false) что нет ни одного объекта с ключом email
    const isCustomerPresent = allCustomersData.some((customer) => customer.email === data.email);
    expect(isCustomerPresent).toBe(false);
  });
});
