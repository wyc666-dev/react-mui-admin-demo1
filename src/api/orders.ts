import type { Order } from "@/pages/Orders/type";
import { http } from "./http";

export const GetOrder = async () => {
  const response = await http.get("orders");
  return response.data;
};
export const DeleteOrder = async (id: number) => {
  const response = await http.delete(`orders/${id}`);
  return response.data;
};

export const AddOrder = async (order: Order) => {
  const response = await http.post("orders", order);
  return response.data;
};

export const UpdateOrder = async (order: Order) => {
  const response = await http.put(`orders/${order.id}`, order);
  return response.data;
};
