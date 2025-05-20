import { CustomersApiService } from "api/services (business)/customers.api-service";
import { ProductsApiService } from "api/services (business)/products.api-service";
import { test as base } from "fixtures/contollers.fixture";

// Определяем интерфейс, который описывает, какие сервисы будут доступны через фикстуры
interface IApiServices {
  customersApiService: CustomersApiService;
  productsApiService: ProductsApiService;
}

// Расширяем базовую функцию 'test', чтобы добавить наши кастомные фикстуры
export const test = base.extend<IApiServices>({
  customersApiService: async ({ request }, use) => {
    await use(new CustomersApiService(request));
  },
  productsApiService: async ({ request }, use) => {
    await use(new ProductsApiService(request));
  },
});

export { expect } from "@playwright/test";
