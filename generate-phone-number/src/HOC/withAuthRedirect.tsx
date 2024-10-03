import { isEmpty } from "lodash";
import { ComponentType } from "react";
import { Navigate } from "react-router-dom";
import { WEB_PATHS } from "../constant";
import { useAuth } from "../hooks";

const withAuthRedirect = (WrappedComponents: ComponentType) => {
  return () => {
    const me = useAuth();
    const isAuthenticated = me.isLogged;

    console.log({ me, isAuthenticated })

    if (isAuthenticated) {
      return <Navigate to={WEB_PATHS.ADMIN.DASHBOARD} />
    }

    return <WrappedComponents />
  }
}

export default withAuthRedirect;
