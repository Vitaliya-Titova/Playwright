import { test as base } from "@playwright/test";
import { CustomersController } from "api/controllers/customers.controller";
import { SignInController } from "api/controllers/signIn.controller";

interface ISalesPortalControllers {
  customersController: CustomersController;
  loginController: SignInController;
}

export const test = base.extend<ISalesPortalControllers>({
  customersController: async ({}, use) => {
    //в use то что надо вернуть
    await use(new CustomersController());
  },
  loginController: async ({}, use) => {
    await use(new SignInController());
  },
});

export { expect } from "@playwright/test";
