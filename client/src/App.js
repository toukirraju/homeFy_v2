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

function App() {
  const authChecked = useAuthCheck();

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
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
