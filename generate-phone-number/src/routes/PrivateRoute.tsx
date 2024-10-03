import { Navigate, Outlet } from "react-router-dom";
import { isEmpty } from "lodash";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { useAuth } from "../hooks";

function PrivateRoute() {
  const { isLogged } = useAuth();
  return isLogged ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default PrivateRoute;
