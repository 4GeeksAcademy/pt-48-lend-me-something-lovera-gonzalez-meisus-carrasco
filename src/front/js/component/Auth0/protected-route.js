import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import {Spinner} from "../spinner"

export const AuthenticationGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <Spinner/>
    ),
  });

  return <Component />;
};