import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home/Home";
import SignIn from "./pages/authentication/SignIn";
import SignUp from "./pages/authentication/SignUp";
import useAuthCheck from "./hooks/useAuthCheck";
import PrivateRoute from "./utility/PrivateRoute";
import Profile from "./pages/profile/Profile";
import PublicRoute from "./utility/PublicRoute";
import DarkModeToggle from "./Components/DarkModeToggle";
import ReactGA from "react-ga4";
import Conversation from "./pages/message/pages/Conversation";
import Inbox from "./pages/message/pages/Inbox";

function App() {
  const authChecked = useAuthCheck();

  const tracking_id = "G-9ZCV1MYXZ6";
  ReactGA.initialize(tracking_id);

  return !authChecked ? (
    <div>Checking authentication.......</div>
  ) : (
    <div>
      <section className="mask"></section>
      <span className="hidden">
        <DarkModeToggle />
      </span>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route
            path="/signin"
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/inbox"
            element={
              <PrivateRoute>
                {/* <PullToRefresh onRefresh={onRefresh} refreshing={isRefreshing}> */}
                <Conversation />
                {/* </PullToRefresh> */}
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

          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
