export type RangeValue = "7d" | "30d" | "90d";

export interface SalesTrendItem {
  date: string;
  sales: number;
  orders: number;
}
