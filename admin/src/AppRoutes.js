import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./Components/Navigation/sidebar/Sidebar";
import Apartment from "./pages/apartment/Apartment";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/home/Home";
import Message from "./pages/message/Message";
import Profile from "./pages/profile/Profile";
import Renter from "./pages/renter/Renter";
import Transaction from "./pages/transaction/Transaction";

const AppRoutes = ({ user }) => {
  const location = useLocation();
  return (
    <>
      <div className="App">
        {/* <div className="blur" style={{ top: "-18%", right: "0" }}></div>
        <div className="blur" style={{ top: "36%", left: "-8rem" }}></div> */}
        <div
          style={{
            display: `${location.pathname === "/home" ? "none" : "flex"}`,
          }}
          className="sidebar_container"
        >
          <Sidebar />
        </div>
        <div className="body_container">
          <Routes>
            <Route
              path="/"
              element={user ? <Dashboard /> : <Navigate to="/auth" />}
            />
            <Route
              path="apartment"
              element={user ? <Apartment /> : <Navigate to="/auth" />}
            />
            <Route
              path="renter"
              element={user ? <Renter /> : <Navigate to="/auth" />}
            />
            <Route
              path="transaction"
              element={user ? <Transaction /> : <Navigate to="/auth" />}
            />
            <Route
              path="message"
              element={user ? <Message /> : <Navigate to="/auth" />}
            />
            <Route
              path="profile"
              element={user ? <Profile /> : <Navigate to="/auth" />}
            />

            {/* <Route path="/home" element={<Home />} /> */}

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default AppRoutes;
