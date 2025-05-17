import { expect, test } from "fixtures/businessSteps.fixture";
import { MetricsResponse } from "types/home.types";

test.describe("[UI] [Home] [Metrics]", async () => {
  test("Should display valid Metrics: Orders This Year,  New Customers, Canceled Orders", async ({ loginAsLocalUser, homePage, mock }) => {
    const mockData: MetricsResponse = {
      IsSuccess: true,
      ErrorMessage: null,
      Metrics: {
        orders: {
          totalRevenue: 500,
          totalOrders: 70,
          avgOrderValue: 600,
          canceledOrders: 8,
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

    await loginAsLocalUser();
    await homePage.waitForOpened();

    console.log("Mock Data:", mockData);

    const metrics = await homePage.getMetricsOrders();
    console.log("metrics", metrics);

    // Проверяем, что метрики  отображают правильную сумму
    expect.soft(metrics.totalOrders).toBe(mockData.Metrics.orders.totalOrders);
    expect.soft(metrics.totalRevenue).toBe(mockData.Metrics.orders.totalRevenue);
    expect.soft(metrics.canceledOrders).toBe(mockData.Metrics.orders.canceledOrders);
    expect.soft(metrics.avgOrderValue).toBe(mockData.Metrics.orders.avgOrderValue);

    const totalNewCustomersData = await homePage.totalNewCustomers.innerText();
    expect.soft(+totalNewCustomersData).toBe(mockData.Metrics.customers.totalNewCustomers);

    //2var
    const totalCanceledOrdersData = await homePage.canceledOrders.innerText();
    expect.soft(+totalCanceledOrdersData).toBe(mockData.Metrics.orders.canceledOrders);
  });
});
