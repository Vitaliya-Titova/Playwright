import { test as base } from "fixtures/pages.fixture";
import { AddNewCustomerUiService } from "ui/services (business)/customers/add-new-customer.ui-service";
import { CustomersUIService } from "ui/services (business)/customers/customers.ui-service";
import { EditCustomerUiService } from "ui/services (business)/customers/edit-customer.ui-service";
import { HomeUIService } from "ui/services (business)/home.ui-service";
import { SignInUIService } from "ui/services (business)/signIn.ui-serivice";

interface IUIServices {
  homeUIService: HomeUIService;
  signInUIService: SignInUIService;
  customersUIService: CustomersUIService;
  addNewCustomerUIService: AddNewCustomerUiService;
  editCustomerUIService: EditCustomerUiService;
}

export const test = base.extend<IUIServices>({
  homeUIService: async ({ page }, use) => {
    await use(new HomeUIService(page));
  },
  signInUIService: async ({ page }, use) => {
    await use(new SignInUIService(page));
  },
  customersUIService: async ({ page }, use) => {
    await use(new CustomersUIService(page));
  },
  addNewCustomerUIService: async ({ page }, use) => {
    await use(new AddNewCustomerUiService(page));
  },
  editCustomerUIService: async ({ page }, use) => {
    await use(new EditCustomerUiService(page));
  },
});

export { expect } from "@playwright/test";
