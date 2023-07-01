import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Apartment from "./pages/apartment/Apartment";
import Dashboard from "./pages/dashboard/Dashboard";
import Message from "./pages/message/Message";
import Profile from "./pages/profile/Profile";
import Renter from "./pages/renter/Renter";
import Transaction from "./pages/transaction/Transaction";
import Layout from "./Components/Layout";
import Owner from "./pages/owner/Owner";
import House from "./pages/house/House";
import PrivateRoute from "./Components/ProtectedRoutes/PrivateRoute";
import Authentication from "./pages/authentication/Authentication";
import PublicRoute from "./Components/ProtectedRoutes/PublicRoute";

const AppRoutes = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="apartment"
            element={
              <PrivateRoute>
                <Apartment />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="renter"
            element={
              <PrivateRoute>
                <Renter />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="owner"
            element={
              <PrivateRoute>
                <Owner />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="house"
            element={
              <PrivateRoute>
                <House />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="transaction"
            element={
              <PrivateRoute>
                <Transaction />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="message"
            element={
              <PrivateRoute>
                <Message />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRoute>
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
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </Layout>
    </>
  );
};

export default AppRoutes;
