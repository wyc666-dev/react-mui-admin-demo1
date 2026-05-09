import type { Product } from "@/pages/Products/type";
import { http } from "./http";

export const GetProduct = async () => {
  const response = await http.get("products");
  return response.data;
};

export const DeleteProduct = async (id: number) => {
  const response = await http.delete(`products/${id}`);
  return response.data;
};

export const AddProduct = async (product: Product) => {
  const response = await http.post("products", product);
  return response.data;
};

export const UpdateProduct = async (product: Product) => {
  const response = await http.put(`products/${product.id}`, product);
  return response.data;
};
