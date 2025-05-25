import { expect, test } from "fixtures/ui-services.fixture";
import _ from "lodash";
import { convertToDateAndTime } from "utils/date.utils";

test.describe("[E2E] [UI] [Customers] [Details]", () => {
  let token = "";
  let id = "";

  test(
    "Should display valid customer data",
    { tag: ["@smoke", "@regression"] },
    async ({
      // signInUIService,
      homeUIService,
      customersUIService,
      customersApiService,
      customerDetailsPage,
      page,
    }) => {
      // token = await signInUIService.signInAsLocalUser();
      homeUIService.openAsLoggedInUser();
      token = (await page.context().cookies()).find((c) => c.name === "Authorization")!.value;
      const createdCustomer = await customersApiService.create(token);
      id = createdCustomer._id;
      await homeUIService.openModule("Customers");
      await customersUIService.openDetailsPage(createdCustomer.email);
      const actualData = await customerDetailsPage.getDetails();
      test.step("Check displayed customer data matches expected", async () => {
      expect(actualData).toMatchObject({
        ..._.omit(createdCustomer, "_id"),
        createdOn: convertToDateAndTime(createdCustomer.createdOn),
      });   });
    }
  );
  //после каждого теста удаляем customer (не часть теста)
  test.afterEach(async ({ customersController }) => {
    await customersController.delete(id, token);
  });
});
