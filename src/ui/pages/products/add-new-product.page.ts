import { IProduct } from "types/products.type";
import { SalesPortalPage } from "../salePortal.page";
import { logStep } from "utils/reporter.utils";

export class AddNewProductPage extends SalesPortalPage {
  //inputs
  readonly nameInput = this.page.locator("#inputName");
  readonly manufacturerInput = this.page.locator("#inputManufacturer");
  readonly priceInput = this.page.locator("#inputPrice");
  readonly amountInput = this.page.locator("#inputAmount");
  readonly notesInput = this.page.locator("#textareaNotes");

  //buttons
  readonly saveNewProductButton = this.page.locator("#save-new-product");

  //error
  readonly nameError = this.page.locator("#error-inputName");

  readonly uniqueElement = this.saveNewProductButton;

  @logStep("UI: Fill New Product inputs")
  async fillInputs(product: Partial<IProduct>) {
    product.name && (await this.nameInput.fill(String(product.name)));
    product.manufacturer && (await this.manufacturerInput.selectOption(product.manufacturer));
    product.price && (await this.priceInput.fill(product.price.toString()));
    product.amount && (await this.amountInput.fill(product.amount.toString()));
    product.notes && (await this.notesInput.fill(product.notes));
  }

  @logStep("UI: Click on Save New Product button")
  async clickSaveNewProduct() {
    await this.saveNewProductButton.click();
  }

  @logStep("UI: Get Errot Message")
  async getError() {
    return await this.nameError.textContent();
  }
}
