import { SalesPortalPage } from "../salePortal.page";
import { FilterModal } from "../modals/customers/filter.modal";
import { expect } from "fixtures/pages.fixture";
import { productSortField } from "types/api.types";
import { IProductInTable } from "types/products.type";
import { MANUFACTURER } from "data/products/manufacturer.data";
import numeral from "numeral";
import { ProductDetailsModal } from "../modals/products/productDetails.modal";
import { logStep } from "utils/reporter.utils";

export class ProductsPage extends SalesPortalPage {
  //modals
  readonly filterModal = new FilterModal(this.page);
  //   readonly deleteCustomerModal = new DeleteCustomerModal(this.page);

  //header menu
  readonly addNewProductButton = this.page.getByRole("button", {
    name: "Add Product",
  });
  //search
  readonly searchInput = this.page.locator('input[type="search"]');
  readonly searchButton = this.page.locator("#search-products");
  readonly chipButton = this.page.locator(".chip");
  readonly searchChipButton = this.page.locator('div[data-chip-products="search"]');

  //filter - modal window
  readonly filterButton = this.page.getByRole("button", { name: "Filter" });

  //table
  readonly table = this.page.locator("#table-products");

  //table -headers
  readonly tableHeader = this.page.locator("#table-products th div[current]");
  readonly nameHeader = this.tableHeader.filter({ hasText: "Name" });
  readonly priceHeader = this.tableHeader.filter({ hasText: "Price" });
  readonly manufacturerHeader = this.tableHeader.filter({ hasText: "Manufacturer" });
  readonly createdOnHeader = this.tableHeader.filter({ hasText: "Created On" });

  //table -row
  readonly tableRow = this.page.locator("#table-products tbody tr");
  readonly tableRowByName = (name: string) => this.tableRow.filter({ has: this.page.getByText(name, { exact: true }) }); //точное совпадение name
  readonly nameCell = (name: string) => this.tableRowByName(name).locator("td").nth(0);
  readonly priceCell = (name: string) => this.tableRowByName(name).locator("td").nth(1);
  readonly manufacturerCell = (name: string) => this.tableRowByName(name).locator("td").nth(2);
  readonly createdOnCell = (name: string) => this.tableRowByName(name).locator("td").nth(3);
  readonly editButton = (name: string) => this.tableRowByName(name).getByTitle("Edit");
  readonly detailsButton = (name: string) => this.tableRowByName(name).getByTitle("Details");
  readonly deleteButton = (name: string) => this.tableRowByName(name).getByTitle("Delete");
  readonly emptyTableRow = this.page.locator("td.fs-italic");

  //detailsModal
  readonly detailsModal = new ProductDetailsModal(this.page);

  readonly uniqueElement = this.addNewProductButton;

  //   async open() {
  //     // Выполняет fun renderCustomersPage в контексте браузера и ожидает её завершения
  //     await this.page.evaluate(async () => {
  //       //Приводит объект 'window' к типу, который включает  fun renderCustomersPage и вызывает её.
  //       await (window as typeof window & { renderCustomersPage: () => Promise<void> }).renderCustomersPage();
  //     });
  //   }

  @logStep("UI: Click on Add New Product button on Product Page")
  async clickAddNewProduct() {
    await this.addNewProductButton.click();
  }

  @logStep("UI: Click on Delete Product button on Product Page")
  async clickDeleteProduct(productName: string) {
    await this.deleteButton(productName).click();
  }

  @logStep("UI: Click on Filter Button on Product Page")
  async clickFilter() {
    await this.filterButton.click();
  }

  @logStep("UI: Click on Table Action on Product Page")
  async clickTableAction(productName: string, action: "edit" | "details" | "delete") {
    const buttons = {
      edit: this.editButton(productName),
      details: this.detailsButton(productName),
      delete: this.deleteButton(productName),
    };

    await buttons[action].click();
  }

  @logStep("UI: Click on Detail on Product Page")
  async clickDetails(name: string) {
    await this.detailsButton(name).click();
    await this.detailsModal.waitForOpened();
  }

  @logStep("Get Product Data by Name in Table on Product Page")
  async getProductData(productName: string): Promise<IProductInTable> {
    const [name, price, manufacturer, createdOn] = await this.tableRowByName(productName).locator("td").allInnerTexts(); //массив строк >> в const распаковывает этот массив в отдельные переменные
    return {
      //вернёт объект с 3 полями:
      name,
      price: numeral(price.trim()).value() ?? 0,
      manufacturer: manufacturer as MANUFACTURER,
      //createdOn
    };
  }

  //все строки таблицы >> возвращает  массив объектов name, price, manufacturer из всей таблицы
  @logStep("Get All Products data in Table on Product Page")
  async getTabelData() {
    const tableData: Array<IProductInTable> = [];

    const rows = await this.tableRow.all();
    for (const row of rows) {
      const [name, price, manufacturer, createdOn] = await row.locator("td").allInnerTexts();
      tableData.push({
        name,
        price: numeral(price.trim()).value() ?? 0,
        manufacturer: manufacturer as MANUFACTURER,
        //createdOn
      });
    }
    return tableData;
  }

  @logStep("UI: Fill Search Field on Product Page")
  async fillSearch(value: string | number) {
    await this.searchInput.fill(String(value));
  }

  @logStep("UI: Click on SearchButton on Product Page")
  async clickSearch() {
    await this.searchButton.click();
  }

  @logStep("UI: Perform Search on Product Page")
  async search(value: string | number) {
    await this.fillSearch(value);
    await this.clickSearch();
    await this.waitForOpened();
  }

  //клик по хедерам таблицы products
  @logStep("UI: Click on Table Header on Product Page")
  async clickTableHeader(header: productSortField) {
    switch (header) {
      case "name":
        await this.nameHeader.click();
        break;
      case "price":
        await this.priceHeader.click();
        break;
      case "manufacturer":
        await this.manufacturerHeader.click();
        break;
      case "createdOn":
        await this.createdOnHeader.click();
        break;
    }
  }
}
