export type OrderStatus = "待付款" | "已付款" | "已发货" | "已完成";

export interface Order {
  id: number;
  orderId: number | "";
  customerName: string;
  amount: number | "";
  status: OrderStatus | "";
  createdAt: string;
  product: string;
}
