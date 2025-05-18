import { Page, test as base, expect } from "@playwright/test";
import { apiConfig } from "config/api-config";
import { STATUS_CODES } from "data/statusCodes";
import { ICustomerResponse, ICustomersResponse } from "types/customer.types";
import { MetricsResponse } from "types/home.types";

class Mock {
  constructor(private page: Page) {}

  //customers page
  async customers(body: ICustomersResponse, statusCode: STATUS_CODES = STATUS_CODES.OK) {
    //route()ищет запрос по урлу, ждет респонс и переопределяем респонс ч/з fulfill
    this.page.route(/\/api\/customers(\?.*)?$/, async (route) => {
      //регулярка отсекает query-параметры
      await route.fulfill({
        status: statusCode,
        contentType: "application/json",
        body: JSON.stringify(body),
      });
    });
  }

  //customer detail page
  async customerDetails(body: ICustomerResponse, statusCode: STATUS_CODES = STATUS_CODES.OK) {
    this.page.route(apiConfig.BASE_URL + "/" + apiConfig.ENDPOINTS.CUSTOMER_BY_ID(body.Customer._id), async (route) => {
      await route.fulfill({
        status: statusCode,
        contentType: "application/json",
        body: JSON.stringify(body),
      });
    });
  }
  //home metrics
  async homeMetricOrder(body: MetricsResponse, statusCode: STATUS_CODES = STATUS_CODES.OK) {
    this.page.route(apiConfig.BASE_URL + "/" + apiConfig.ENDPOINTS.METRICS, async (route) => {
      await route.fulfill({
        status: statusCode,
        contentType: "application/json",
        body: JSON.stringify(body),
      });
    });
  }
}

export interface ISortingMockOptions {
  sortField: string;
  sortDir: string;
}

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
