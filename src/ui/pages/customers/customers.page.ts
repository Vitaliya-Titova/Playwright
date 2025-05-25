import { ICustomer, ICustomerInTable } from "types/customer.types";
import { SalesPortalPage } from "../salePortal.page";
import { COUNTRIES } from "data/customers/countries.data";
import { FilterModal } from "../modals/customers/filter.modal";
import { expect } from "fixtures/pages.fixture";
import { DeleteCustomerModal } from "../modals/customers/delete.modal";
import { customersSortField } from "types/api.types";
import { logStep } from "utils/reporter.utils";

export class CustomersPage extends SalesPortalPage {
  //modals
  readonly filterModal = new FilterModal(this.page);
  readonly deleteCustomerModal = new DeleteCustomerModal(this.page);

  //header menu
  readonly addNewCustomerButton = this.page.getByRole("button", {
    name: "Add Customer",
  });
  //search
  readonly searchInput = this.page.locator('input[type="search"]');
  readonly searchButton = this.page.locator("#search-customer");
  readonly chipButton = this.page.locator(".chip");
  readonly searchChipButton = this.page.locator('div[data-chip-customers="search"]');

  //filter - modal window
  readonly filterButton = this.page.getByRole("button", { name: "Filter" });

  //table
  readonly table = this.page.locator("#table-customers");

  //table -headers
  readonly tableHeader = this.page.locator("#table-customers th div[current]");
  readonly emailHeader = this.tableHeader.filter({ hasText: "Email" });
  readonly nameHeader = this.tableHeader.filter({ hasText: "Name" });
  readonly countryHeader = this.tableHeader.filter({ hasText: "Country" });
  readonly createdOnHeader = this.tableHeader.filter({ hasText: "Created On" });

  //table -row
  readonly tableRow = this.page.locator("#table-customers tbody tr");
  readonly tableRowByEmail = (email: string) => this.tableRow.filter({ has: this.page.getByText(email) });
  readonly emailCell = (email: string) => this.tableRowByEmail(email).locator("td").nth(0);
  readonly nameCell = (email: string) => this.tableRowByEmail(email).locator("td").nth(1);
  readonly countryCell = (email: string) => this.tableRowByEmail(email).locator("td").nth(2);
  readonly createdOnCell = (email: string) => this.tableRowByEmail(email).locator("td").nth(3);
  readonly editButton = (email: string) => this.tableRowByEmail(email).getByTitle("Edit");
  readonly detailsButton = (email: string) => this.tableRowByEmail(email).getByTitle("Details");
  readonly deleteButton = (email: string) => this.tableRowByEmail(email).getByTitle("Delete");
  readonly emptyTableRow = this.page.locator("td.fs-italic");

  readonly uniqueElement = this.addNewCustomerButton;

  async open() {
    // Выполняет fun renderCustomersPage в контексте браузера и ожидает её завершения
    await this.page.evaluate(async () => {
      //Приводит объект 'window' к типу, который включает  fun renderCustomersPage и вызывает её.
      await (window as typeof window & { renderCustomersPage: () => Promise<void> }).renderCustomersPage();
    });
  }

  @logStep("Click on Add New Customer button")
  async clickAddNewCustomer() {
    await this.addNewCustomerButton.click();
  }

  @logStep("Click on Delete Customer button")
  async clickDeleteCustomer(customerEmail: string) {
    await this.deleteButton(customerEmail).click();
  }

  @logStep("Click on Filter Button on Customer Page")
  async clickFilter() {
    await this.filterButton.click();
  }

  @logStep("Click on Table Action")
  async clickTableAction(customerEmail: string, action: "edit" | "details" | "delete") {
    const buttons = {
      edit: this.editButton(customerEmail),
      details: this.detailsButton(customerEmail),
      delete: this.deleteButton(customerEmail),
    };

    await buttons[action].click();
  }

  async getCustomerData(customerEmail: string): Promise<ICustomerInTable> {
    //variant 1 - в асинх последовательные действия  - плохо
    // return {
    //   email: await this.emailCell(email).textContent(),
    //   name: await this.nameCell(email).textContent(),
    //   country: await this.countryCell(email).textContent(),
    //   createdOn: await this.createdOnCell(email).textContent(),
    // };

    //variant 2 - действия в параллель
    // const [email, name, country, createdOn] = await Promise.all([
    //   this.emailCell(customerEmail).textContent(),
    //   this.nameCell(customerEmail).textContent(),
    //   this.countryCell(customerEmail).textContent(),
    //   this.createdOnCell(customerEmail).textContent(),
    // ]);
    // return { email, name, country, createdOn };

    //variant 3
    const [email, name, country, createdOn] = await this.tableRowByEmail(customerEmail).locator("td").allInnerTexts(); //массив строк >> в const распаковывает этот массив в отдельные переменные
    return {
      //вернёт объект с 3 полями:
      email,
      name,
      country: country as COUNTRIES,
      //createdOn
    };
  }

  //все строки таблицы >> возвращает  массив объектов email, name, country из всей таблицы
  async getTabeData() {
    const tableData: Array<ICustomerInTable> = [];

    const rows = await this.tableRow.all();
    for (const row of rows) {
      const [email, name, country, createdOn] = await row.locator("td").allInnerTexts();
      tableData.push({
        email,
        name,
        country: country as COUNTRIES,
        //createdOn
      });
    }
    return tableData;
  }

  async fillSearch(value: string | number) {
    await this.searchInput.fill(String(value));
  }

  async clickSearch() {
    await this.searchButton.click();
  }

  async search(value: string | number) {
    await this.fillSearch(value);
    await this.clickSearch();
    await this.waitForOpened();
  }

  //клик по хедерам таблицы customers
  async clickTableHeader(header: customersSortField) {
    switch (header) {
      case "email":
        await this.emailHeader.click();
        break;
      case "name":
        await this.nameHeader.click();
        break;
      case "country":
        await this.countryHeader.click();
        break;
      case "createdOn":
        await this.createdOnHeader.click();
        break;
    }
  }

  //hw21
  async checkNewCustomer(email: string, name: string, country: string) {
    const tableFirstRow = this.page.locator("#table-customers tbody tr:first-child");
    const emailList = tableFirstRow.locator("td:nth-child(1)");
    await expect.soft(emailList).toHaveText(email);
    const namelList = tableFirstRow.locator("td:nth-child(2)");
    await expect.soft(namelList).toHaveText(name);
    const countrylList = tableFirstRow.locator("td:nth-child(3)");
    await expect.soft(countrylList).toHaveText(country);
  }
}
