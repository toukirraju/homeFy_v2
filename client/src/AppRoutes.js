import { Routes, Route, Navigate } from "react-router-dom";
import Authentication from "./pages/authentication/Authentication";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";

const AppRoutes = ({ user }) => {
  return (
    <>
      <Routes>
        <Route
          path="/home"
          element={
            user?.user.role === undefined ? <Home /> : <Navigate to="/auth" />
          }
        />
        <Route
          path="/profile"
          element={
            user?.user.role === undefined ? (
              <Profile />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route
          path="auth"
          element={
            user?.user.role === undefined ? (
              <Navigate to="/home" />
            ) : (
              <Authentication />
            )
          }
        />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
