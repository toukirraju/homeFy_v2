import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  // const { token, user } = useSelector((state) => state.auth);

  // if (token && user?.role?.name === "admin") {
  //   return children;
  // }
  // return <Navigate to="/auth" />;
  const isLoggedIn = useAuth();
  return isLoggedIn ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;
