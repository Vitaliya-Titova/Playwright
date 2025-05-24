import { test as base } from "fixtures/mock.fixture";
import { AddNewCustomerPage } from "ui/pages/customers/add-new-customer.page";
import { CustomersPage } from "ui/pages/customers/customers.page";
import { HomePage } from "ui/pages/home.page";
import { Pages } from "./page";
import { SignInPage } from "ui/pages/signIn.page";
import { EditCustomerPage } from "ui/pages/customers/edit-customer.page";
import { SideMenuComponent } from "ui/pages/sideMenu.page";
import { CustomerDetailsPage } from "ui/pages/customers/customer-details.page";
import { ProductsPage } from "ui/pages/products/products.page";
import { AddNewProductPage } from "ui/pages/products/add-new-product.page";

//2 подхода организации фикстур для Page Objects:
//2й подход (1й pages.ts) - определяем не инстанса как в page.ts, а интерфейс ISalesPortalPages с перечислением всех страниц
// каждый Page Object объявляется как отдельная фикстура,
// позволяет тестам запрашивать конкретные Page Objects напрямую в аргументах
//Разница в 1 и 2 подходов в вызове  >> 
// 2й подход -вызов без доп объект pages, но в фикстуре надо прописать каждую страницу отдельно и импортировать в фикстуры тест отдельно

interface ISalesPortalPages {
  signInPage: SignInPage;
  homePage: HomePage;
  sideMenu: SideMenuComponent;
  customersPage: CustomersPage;
  addNewCustomerPage: AddNewCustomerPage;
  editCustomerPage: EditCustomerPage;
  customerDetailsPage: CustomerDetailsPage;
  productsPage: ProductsPage;
  addNewProductPage: AddNewProductPage;
}

export const test = base.extend<ISalesPortalPages>({
  signInPage: async ({ page }, use) => {
    await use(new SignInPage(page)); // в use указываем то, что надо вернуть
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
  customerDetailsPage: async ({ page }, use) => {
    await use(new CustomerDetailsPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  addNewProductPage: async ({ page }, use) => {
    await use(new AddNewProductPage(page));
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
