import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const token = Cookies.get("loginToken") == null ? false : true;

  // console.log(token)
  return token ? children : <Navigate to="/user/signin" />;
};
