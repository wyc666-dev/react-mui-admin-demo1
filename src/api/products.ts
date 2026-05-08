import { http } from "./http";

const GetProduct = async () => {
  const response = await http.get("products");
  return response.data;
};

export default GetProduct;
