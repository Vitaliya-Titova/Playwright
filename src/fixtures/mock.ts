import { Page } from "@playwright/test";
import { apiConfig } from "config/api-config";
import { STATUS_CODES } from "data/statusCodes";
import { ICustomerResponse, ICustomersResponse } from "types/customer.types";
import { MetricsResponse } from "types/home.types";
import { IProductResponse, IProductsResponse } from "types/products.type";

export class Mock {
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

  //product page
  //ч/з метод route -  как только получим в респонсе с нужного endpoint -
  // используем метод который переопределит респонс
  async products(body: IProductsResponse, statusCode: STATUS_CODES = STATUS_CODES.OK) {
    this.page.route(/\/api\/products(\?.*)?$/, async (route) => {
      await route.fulfill({
        status: statusCode,
        contentType: "application/json",
        body: JSON.stringify(body),
      });
    });
  }

  //product detail
  async productDetails(body: IProductResponse, statusCode: STATUS_CODES = STATUS_CODES.OK) {
    this.page.route(apiConfig.BASE_URL + "/" + apiConfig.ENDPOINTS.PRODUCT_BY_ID(body.Product._id), async (route) => {
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




