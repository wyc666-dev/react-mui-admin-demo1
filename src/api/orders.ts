import { http } from "./http";

const GetOrder = async () => {
  const response = await http.get("orders");
  return response.data;
};

export default GetOrder;
