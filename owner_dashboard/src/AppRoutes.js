import { Navigate, Route, Routes } from "react-router-dom";
import Apartment from "./pages/apartment/Apartment";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import Renter from "./pages/renter/Renter";
import Transaction from "./pages/transaction/Transaction";
import PrivateRoute from "./utility/PrivateRoute";
import Authentication from "./pages/authentication/Authentication";
import PublicRoute from "./utility/PublicRoute";
import Conversation from "./pages/message/pages/Conversation";
import Inbox from "./pages/message/pages/Inbox";

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
          path="/inbox"
          element={
            <PrivateRoute>
              <Conversation />
            </PrivateRoute>
          }
        />
        <Route
          path="/inbox/:id"
          element={
            <PrivateRoute>
              <Inbox />
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
