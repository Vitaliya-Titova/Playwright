import { MANUFACTURER } from "data/products/manufacturer.data";
import { Modal } from "../modal.pages";
import { IProduct } from "types/products.type";

export class ProductDetailsModal extends Modal {
  readonly modalBody = this.page.locator(`#details-modal-body-container`);
  readonly values = this.modalBody.locator("p");

  uniqueElement = this.modalBody;

  //  получаем все детали продукта
  // возвращает Promise, который разрешается объектом IProduct
  // (Required тк все поля IProduct обязат-е тк notes все равно придет) и доп поле createdOn.
  async getDetails(): Promise<Required<IProduct> & { createdOn: string }> {
    // allInnerTexts() - Параллельно извлекаем текстовое содержимое всех  элем-в - строгий порядок извлечения элем-в
    const [name, amount, price, manufacturer, createdOn, notes] = await this.values.allInnerTexts();
    // Возвращаем объект, созданный из извлеченных текстовых значений
    return {
      name,
      amount: +amount,
      price: +price,
      manufacturer: manufacturer as MANUFACTURER,
      createdOn,
      notes,
    };
  }
}
