import { TAGS } from "data/tages";
import { expect, test } from "fixtures/ui-services.fixture";
import { MetricsResponse } from "types/home.types";

test.describe("[UI] [Home] [Metrics]", async () => {
  test(
    "Should display valid Metrics: Orders This Year,  New Customers, Canceled Orders",
    { tag: [TAGS.UI, TAGS.SMOKE, TAGS.REGRESSION] },
    async ({ homeUIService, homePage, mock }) => {
      const mockData: MetricsResponse = {
        IsSuccess: true,
        ErrorMessage: null,
        Metrics: {
          orders: {
            totalRevenue: 500,
            totalOrders: 70,
            averageOrderValue: 600,
            totalCanceledOrders: 8,
            ordersCountPerDay: [],
            recentOrders: [],
          },
          customers: {
            topCustomers: [],
            totalNewCustomers: 1234,
            customerGrowth: [],
          },
          products: {
            topProducts: [],
          },
        },
      };

      // Мокирование API-запроса для получения данных
      await mock.homeMetricOrder(mockData);

      await homeUIService.openAsLoggedInUser();
      await homePage.waitForOpened();

      const metrics = await homePage.getMetricsOrders();

      // Проверяем, что метрики  отображают правильную сумму
      test.step("Verify valid Metrics on Home Page", async () => {
        expect.soft(metrics.totalOrders).toBe(mockData.Metrics.orders.totalOrders);
        expect.soft(metrics.totalRevenue).toBe(mockData.Metrics.orders.totalRevenue);
        expect.soft(metrics.totalCanceledOrders).toBe(mockData.Metrics.orders.totalCanceledOrders);
        expect.soft(metrics.averageOrderValue).toBe(mockData.Metrics.orders.averageOrderValue);

        const totalNewCustomersData = await homePage.totalNewCustomers.innerText();
        expect.soft(+totalNewCustomersData).toBe(mockData.Metrics.customers.totalNewCustomers);

        //2var
        const totalCanceledOrdersData = await homePage.totalCanceledOrders.innerText();
        expect.soft(+totalCanceledOrdersData).toBe(mockData.Metrics.orders.totalCanceledOrders);
      });
    }
  );
});
