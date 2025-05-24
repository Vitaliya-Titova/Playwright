import { Page } from "@playwright/test";
import { ProductsPage } from "ui/pages/products/products.page";
import { AddNewProductPage } from "ui/pages/products/add-new-product.page";
import { IProduct } from "types/products.type";

export class ProductsUIService {
  private productsPage: ProductsPage;
  private addNewProductPage: AddNewProductPage;
  // private editProductPage: EditCustomerPage;
  // private productDetailsPage: CustomerDetailsPage;
  constructor(private page: Page) {
    this.productsPage = new ProductsPage(page);
    this.addNewProductPage = new AddNewProductPage(page);

    // this.editProductPage = new EditCustomerPage(page);
    // this.productDetailsPage = new CustomerDetailsPage(page);
  }

  async openAddPage() {
    await this.productsPage.clickAddNewProduct();
    await this.addNewProductPage.waitForOpened();
  }
}

// async openEditPage(name: string) {
//   await this.productsPage.clickTableAction(name, "edit");
//   await this.editProductPage.waitForOpened();
// }

// async openDetailsPage(name: string) {
//   await this.productsPage.clickTableAction(name, "details");
//   await this.productDetailsPage.waitForOpened();
// }
