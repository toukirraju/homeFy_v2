import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useAuth();
  return isLoggedIn ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
