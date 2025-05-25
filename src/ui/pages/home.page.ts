import { Locator } from "@playwright/test";
import { ModuleName, OrdersMetrics } from "types/home.types";
import { SalesPortalPage } from "./salePortal.page";
import numeral from "numeral";
import { logStep } from "utils/reporter.utils";

export class HomePage extends SalesPortalPage {
  readonly title = this.page.locator(".welcome-text");
  readonly customersButton = this.page.getByRole("link", { name: "Customer" });
  readonly productsButton = this.page.getByRole("link", { name: "Products" });
  readonly ordersButton = this.page.getByRole("link", { name: "Orders" });

  readonly uniqueElement = this.title;

  //Business Metrics Overview
  readonly totalOrders = this.page.locator("#total-orders-container .card-text");
  readonly totalRevenue = this.page.locator("#total-revenue-container .card-text");
  readonly totalNewCustomers = this.page.locator("#total-customers-container .card-text");
  readonly averageOrderValue = this.page.locator("#avg-orders-value-container .card-text");
  readonly totalCanceledOrders = this.page.locator("#canceled-orders-container .card-text");

  @logStep("Click on Module button")
  async clickModuleButton(moduleName: ModuleName) {
    const moduleButtons: Record<ModuleName, Locator> = {
      Customers: this.customersButton,
      Products: this.productsButton,
      Orders: this.ordersButton,
    };

    await moduleButtons[moduleName].click();
  }

  @logStep("Get Metrics Orders from HomePage")
  async getMetricsOrders(): Promise<OrdersMetrics> {
    // получаем  текст из  metrics
    const [totalOrders, totalRevenue, totalCanceledOrders, averageOrderValue] = await Promise.all([
      //параллельно дождаться  данных со страницы
      this.totalOrders.innerText(), // текстовое содержимое элемента
      this.totalRevenue.innerText(),
      this.totalCanceledOrders.innerText(),
      this.averageOrderValue.innerText(),
    ]);
    return {
      totalOrders: +totalOrders, //преобразуем метрики в числа
      totalRevenue: numeral(totalRevenue.trim()).value() ?? 0,
      totalCanceledOrders: +totalCanceledOrders,
      averageOrderValue: numeral(averageOrderValue.trim()).value() ?? 0,
      // totalRevenue: +totalRevenue.trim().replace(/[^0-9.]/g, ""),
      // avgOrderValue: +avgOrderValue.trim().replace(/[^0-9.]/g, ""),
    };
  }
}
