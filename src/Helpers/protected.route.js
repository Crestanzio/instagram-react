import PropTypes from "prop-types";
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import * as ROUTES from "../Constants/routes";

const Dashboard = ({ user }) => {

  return  user ? <Outlet user={user} /> : <Navigate to={ROUTES.LOGIN} />;
};

const Login = ({ user }) => {
    return user ? <Navigate to={ROUTES.DASHBOARD} /> : <Outlet />;
  };

export { Dashboard, Login };

Dashboard.propTypes = {
  user: PropTypes.object,
};

Login.propTypes = {
    user: PropTypes.object,
  };
