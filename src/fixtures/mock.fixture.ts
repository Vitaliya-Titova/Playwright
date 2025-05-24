import { test as base } from "fixtures/api-services.fixture";
import { Mock } from "./mock";

//для типизации фикстуры
interface MockFixture {
  mock: Mock;
}

export const test = base.extend<MockFixture>({
  mock: async ({ page }, use) => {
    await use(new Mock(page));
  },
});

export { expect } from "@playwright/test";
