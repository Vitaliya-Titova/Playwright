import { test as base } from "@playwright/test";
import { AddNewCustomerPage } from "ui/pages/customers/add-new-customer.page";
import { CustomersPage } from "ui/pages/customers/customers.page";
import { HomePage } from "ui/pages/home.page";
import { Pages } from "./page";
import { SignInPage } from "ui/pages/signIn.page";
import { EditCustomerPage } from "ui/pages/customers/edit-customer.page";
import { SideMenuComponent } from "ui/pages/sideMenu.page";

interface ISalesPortalPages {
  signInPage: SignInPage;
  homePage: HomePage;
  sideMenu: SideMenuComponent;
  customersPage: CustomersPage;
  addNewCustomerPage: AddNewCustomerPage;
  editCustomerPage: EditCustomerPage;
}

export const test = base.extend<ISalesPortalPages>({
  signInPage: async ({ page }, use) => {
    await use(new SignInPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  sideMenu: async ({ page }, use) => {
    await use(new SideMenuComponent(page));
  },
  customersPage: async ({ page }, use) => {
    await use(new CustomersPage(page));
  },
  addNewCustomerPage: async ({ page }, use) => {
    await use(new AddNewCustomerPage(page));
  },
  editCustomerPage: async ({ page }, use) => {
    await use(new EditCustomerPage(page));
  },
});

// interface ISalesPortalPages {
//   pages: Pages;
// }

// export const test = base.extend<ISalesPortalPages>({
//   pages: async ({ page }, use) => {
//     await use(new Pages(page));
//   },
// });

export { expect } from "@playwright/test";
