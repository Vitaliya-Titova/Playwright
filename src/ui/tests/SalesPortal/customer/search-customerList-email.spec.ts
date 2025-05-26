import { TAGS } from "data/tages";
import { test, expect } from "fixtures/businessSteps.fixture";

test.describe("[UI] [Customers] [Search]", async () => {
  test("Should search for existing customer by email", { tag: [TAGS.UI, TAGS.SMOKE, TAGS.REGRESSION] }, async ({ homePage, customersPage }) => {
    //await loginAsLocalUser(); - заменяем на контекст логин
    await homePage.openPortal();
    await homePage.waitForOpened();
    await homePage.clickModuleButton("Customers");
    await customersPage.waitForOpened();

    const expected = {
      email: "Vita_test2@domain.com",
      name: "TestVita please dont delete",
      country: "France",
    };
    await customersPage.search(expected.email);
    //сравниваем данные переданные и найденные в таблице

    await expect.soft(customersPage.tableRow).toHaveCount(1);
    const actual = await customersPage.getCustomerData(expected.email);
    expect.soft(actual).toMatchObject(expected);
    //проверка: что искомый email отображается в чипе(теге) под поиском
    await expect.soft(customersPage.searchChipButton).toHaveText(expected.email);
  });
});
