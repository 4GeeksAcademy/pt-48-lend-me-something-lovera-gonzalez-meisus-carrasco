import { withAuthenticationRequired, useAuth0, PopupTimeoutError } from "@auth0/auth0-react";
import React from "react";
import { Spinner } from "../spinner"
import { Home } from "../../pages/home";

export const AuthenticationGuard = ({ component }) => {

  const { isLoading, isAuthenticated, loginWithRedirect, error } = useAuth0()


  const Component = component

  if (isLoading) return (<>
    <Spinner />
  </>)

  if (isAuthenticated) return <Component />;
  if (!isAuthenticated) {
    return <Home />

  }
  return (<><Home /></>)

}

