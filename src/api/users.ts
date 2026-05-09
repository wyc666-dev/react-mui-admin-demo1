import type { User } from "@/pages/Users/type";
import { http } from "./http";

export const GetUser = async () => {
  const response = await http.get("users");
  return response.data;
};

export const DeleteUser = async (id: number) => {
  const response = await http.delete(`users/${id}`);
  return response.data;
};
export const AddUser = async (user: User) => {
  const response = await http.post("users", user);
  return response.data;
};

export const UpdateUser = async (user: User) => {
  const response = await http.put(`users/${user.id}`, user);
  return response.data;
};
