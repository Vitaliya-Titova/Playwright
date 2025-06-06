import { apiConfig } from "config/api-config";
import { COUNTRIES } from "data/customers/countries.data";
import { TAGS } from "data/tages";
import { expect, test } from "fixtures/ui-services.fixture";
import { convertToDateAndTime } from "utils/date.utils";

test.describe("[UI] [Customers] [Details]", async () => {
  test(
    "Should display valid customer data",
    { tag: [TAGS.UI, TAGS.SMOKE, TAGS.REGRESSION] },
    async ({ homeUIService, customersPage, customerDetailsPage, mock, page }) => {
      const expected = {
        email: "Vita_test2@domain.com",
        name: "Anatoly Karpovich",
        country: "USA" as COUNTRIES,
        city: "Warszawa",
        street: "asda",
        house: 321,
        flat: 123,
        phone: "+1111111111111111111",
        createdOn: "2025-05-13T17:33:12.000Z",
        notes: "asdasda",
      };
      const id = "6827ada2d006ba3d47617a27"; //  ID customer, для которого запрашиваются детали

      // await mock.customers({
      //   Customers: [
      //     {
      //       _id: id,
      //       ...expected,
      //     },
      //   ],
      //   ErrorMessage: null,
      //   IsSuccess: true,
      //   sorting: {
      //     sortField: "createdOn",
      //     sortOrder: "desc",
      //   },
      // });

      // Мокирование API-запроса для получения деталей customer по ID
      await mock.customerDetails({ Customer: { _id: id, ...expected }, ErrorMessage: null, IsSuccess: true });

      //await loginAsLocalUser(); - заменяем на контекст логин
      await homeUIService.openAsLoggedInUser();
      // await homePage.clickModuleButton("Customers");
      // await customersPage.waitForOpened();

      // await customersPage.clickTableAction("aaa@gmail.com", "details");
      // await page.evaluate(async (id: string) => {
      //   await (
      //     window as typeof window & { renderCustomerDetailsPage: (id: string) => Promise<void> }
      //   ).renderCustomerDetailsPage(id);
      // }, id);

      // Открытие страницы деталей customer по  ID
      await customerDetailsPage.open(id);
      await customerDetailsPage.waitForOpened();

      // Получение фактических деталей customer, отображаемых на странице
      const actual = await customerDetailsPage.getDetails();
      // Проверка, что фактические данные клиента соответствуют ожидаемым + преобразование формата даты
      test.step("Check that customer data is valid  on Details Page", async () => {
        expect(actual).toEqual({ ...expected, createdOn: convertToDateAndTime(expected.createdOn) });
      });
    }
  );
});
