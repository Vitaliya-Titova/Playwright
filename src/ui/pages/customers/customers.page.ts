import { ICustomer } from "types/customer.types";
import { SalesPortalPage } from "../salePortal.page";
import { expect } from "@playwright/test";

export class CustomersPage extends SalesPortalPage {
  addNewCustomerButton = this.page.getByRole("button", {
    name: "Add Customer",
  });

  uniqueElement = this.addNewCustomerButton;

  async clickAddNewCustomer() {
    await this.addNewCustomerButton.click();
  }

  async checkNewCustomer(email: string, name: string, country: string) {
    const tableFirstRow = this.page.locator(
      "#table-customers tbody tr:first-child"
    );
    const emailList = tableFirstRow.locator("td:nth-child(1)");
    await expect(emailList).toHaveText(email);

    const namelList = tableFirstRow.locator("td:nth-child(2)");
    await expect(namelList).toHaveText(name);

    const countrylList = tableFirstRow.locator("td:nth-child(3)");
    await expect(countrylList).toHaveText(country);
  }
}
