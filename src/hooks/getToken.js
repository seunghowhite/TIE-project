import jwtDecode from "jwt-decode";
import { cookies } from "../shared/cookie";

export const getToken = () => {
  const token = cookies.get("token");
  const tokenPayload = jwtDecode(token);
  return [token, tokenPayload];
}