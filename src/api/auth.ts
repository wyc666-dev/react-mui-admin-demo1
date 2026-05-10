import { http } from "./http";
interface loginItem {
  userName: string;
  password: string;
}

const Auth = async ({ userName, password }: loginItem) => {
  const response = await http.post("api/login", { userName, password });
  return response.data;
};
export default Auth;
