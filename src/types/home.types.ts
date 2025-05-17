export type ModuleName = "Customers" | "Products" | "Orders";

export interface OrdersMetrics {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  canceledOrders: number;
}

export interface MetricsResponse {
  IsSuccess: boolean;
  ErrorMessage: string | null;
  Metrics: {
    orders: {
      canceledOrders: number;
      totalRevenue: number;
      totalOrders: number;
      avgOrderValue: number;

      ordersCountPerDay: Array<{}>;
      recentOrders: Array<{}>;
    };
    customers: {
      topCustomers: Array<{}>;
      totalNewCustomers: number;
      customerGrowth: Array<{}>;
    };
    products: {
      topProducts: Array<{}>;
    };
  };
}
