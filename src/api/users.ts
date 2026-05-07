import { http } from "./http";

const GetUser = async () => {
  const response = await http.get("users");
  return response.data;
};

export default GetUser;
