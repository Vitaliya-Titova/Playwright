import { MANUFACTURER } from "data/products/manufacturer.data";
import { test } from "fixtures/ui-services.fixture";
import { IProduct } from "types/products.type";

test.describe("[UI] [Integration] [Products] [Add] Validations", () => {
  test("Should see correct error message for name field", async ({ signInUIService, homeUIService, productsPage, addNewProductPage }) => {
    await signInUIService.signInAsLocalUser();
    await homeUIService.openModule("Products");
    await productsPage.addNewProductButton.click();
    await addNewProductPage.fillInputs({
      name: 1231451 as unknown as IProduct["name"], //type assertion для негативных тестов
      amount: 1,
      price: 1,
      manufacturer: MANUFACTURER.APPLE,
      notes: "123",
    });
  });
});
