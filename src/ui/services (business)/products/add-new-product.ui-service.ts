import { expect, Page } from "@playwright/test";
import { apiConfig } from "config/api-config";
import { STATUS_CODES } from "data/statusCodes";
import { ProductsPage } from "ui/pages/products/products.page";
import { AddNewProductPage } from "ui/pages/products/add-new-product.page";

import _ from "lodash";
import { IProduct, IProductResponse } from "types/products.type";
import { generateProductData } from "data/products/generateProductData";
import { logStep } from "utils/reporter.utils";

export class AddNewProductUiService {
  private productsPage: ProductsPage;
  private addNewProductPage: AddNewProductPage;
  constructor(private page: Page) {
    this.addNewProductPage = new AddNewProductPage(page);
    this.productsPage = new ProductsPage(page);
  }

  @logStep("UI Service: Create new Product on Add New Product Page")
  async create(productData?: IProduct) {
    //на этом уровне аргумент productData?: IProduct не обязателен
    const data = generateProductData(productData);
    await this.addNewProductPage.fillInputs(data);
    //респонс созданного продукта (ч/з перехват ответа); аргументы урл+клик;
    // привязка контекста ч/з bind -  Контекст метода clickSaveNewProduct привязан к addNewProductPage.
    const response = await this.addNewProductPage.interceptResponse<IProductResponse, any>(
      apiConfig.ENDPOINTS.PRODUCTS,
      this.addNewProductPage.clickSaveNewProduct.bind(this.addNewProductPage)
    );
    //assert
    expect(response.status).toBe(STATUS_CODES.CREATED);
    expect(_.omit(response.body.Product, "_id", "createdOn")).toEqual({ ...data });
    await this.productsPage.waitForOpened();
    return response.body.Product;
  }
}
