import { STATUS_CODES } from "data/statusCodes";
import { TAGS } from "data/tages";
import { expect, test } from "fixtures/ui-services.fixture";

test.describe("[E2E] [UI] [Customers] [Edit]", () => {
  let id = "";
  let token = "";
  test(
    "Edit customer with smoke data",
    { tag: [TAGS.UI, TAGS.SMOKE, TAGS.REGRESSION] },
    async ({
      //  signInUIService,
      homeUIService,
      customersUIService,
      editCustomerUIService,
      customersController,
      customersApiService,
      page,
    }) => {
      //token = await signInUIService.signInAsLocalUser();
      await homeUIService.openAsLoggedInUser();
      token = (await page.context().cookies()).find((c) => c.name === "Authorization")!.value;
      const createdCustomer = await customersApiService.create(token);

      await homeUIService.openModule("Customers");
      await customersUIService.openEditPage(createdCustomer.email);
      const updatedCustomer = await editCustomerUIService.edit();

      const response = await customersController.getById(updatedCustomer._id, token);
      id = updatedCustomer._id;
      test.step("Check that customer is updated via API", async () => {
        expect(response.status).toBe(STATUS_CODES.OK);
      });
    }
  );

  //после каждого теста удаляем customer (не часть теста)
  test.afterEach(async ({ customersController }) => {
    await customersController.delete(id, token);
  });
});
