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
    const emailList = this.page.locator(
      "//*[@id='table-customers']/tbody/tr[1]/td[1]"
    );
    await expect(emailList).toHaveText(email);

    const namelList = this.page.locator(
      "//*[@id='table-customers']/tbody/tr[1]/td[2]"
    );
    await expect(namelList).toHaveText(name);

    const countrylList = this.page.locator(
      "//*[@id='table-customers']/tbody/tr[1]/td[3]"
    );

    await expect(countrylList).toHaveText(country);
  }
}
