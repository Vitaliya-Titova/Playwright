import { STATUS_CODES } from "data/statusCodes";
import { TAGS } from "data/tages";
import { expect, test } from "fixtures/ui-services.fixture";
import _ from "lodash";

test.describe("[E2E] [UI] [Products] [Create]", () => {
  let id = "";
  let token = "";
  test(
    "Create product with smoke data",
    { tag: [TAGS.UI, TAGS.SMOKE, TAGS.REGRESSION] },
    async ({
      // signInUIService,
      homeUIService,
      productsUIService,
      addNewProductUiService,
      productController,
      productsPage,
      page,
    }) => {
      // token = await signInUIService.signInAsLocalUser();
      homeUIService.openAsLoggedInUser();
      token = (await page.context().cookies()).find((c) => c.name === "Authorization")!.value;

      await homeUIService.openModule("Products");

      await productsUIService.openAddPage();
      const createdCProduct = await addNewProductUiService.create();

      //Получаем и верифицируем продукт по API
      const response = await productController.getById(createdCProduct._id, token);
      id = createdCProduct._id;
      expect(response.status).toBe(STATUS_CODES.OK);

      //проверка продукта в таблице
      //сравнивает полученные данные продукта (actualProductData) с новым объектом, созданным из исходных данных

      const actualProductData = await productsPage.getProductData(createdCProduct.name);
      expect(actualProductData).toEqual(
        _.pick(createdCProduct, ["name", "price", "manufacturer"]) //возвращает новый объект, содержащий только указанные поля из исходного
      );
    }
  );

  //после каждого теста удаляем [product] (не часть test)
  test.afterEach(async ({ productController }) => {
    await productController.delete(id, token);
  });
});
