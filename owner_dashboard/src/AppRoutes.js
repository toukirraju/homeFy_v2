import { Navigate, Route, Routes } from "react-router-dom";
import Apartment from "./pages/apartment/Apartment";
import Dashboard from "./pages/dashboard/Dashboard";
import Message from "./pages/message/Message";
import Profile from "./pages/profile/Profile";
import Renter from "./pages/renter/Renter";
import Transaction from "./pages/transaction/Transaction";
import PrivateRoute from "./utility/PrivateRoute";
import Authentication from "./pages/authentication/Authentication";
import PublicRoute from "./utility/PublicRoute";

const AppRoutes = () => {
  return (
    <div className="body_container">
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              {" "}
              <Dashboard />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/apartment"
          element={
            <PrivateRoute>
              {" "}
              <Apartment />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/renter"
          element={
            <PrivateRoute>
              {" "}
              <Renter />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/transaction"
          element={
            <PrivateRoute>
              {" "}
              <Transaction />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/message"
          element={
            <PrivateRoute>
              {" "}
              <Message />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              {" "}
              <Profile />{" "}
            </PrivateRoute>
          }
        />

        <Route
          path="/auth"
          element={
            <PublicRoute>
              {" "}
              <Authentication />{" "}
            </PublicRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
