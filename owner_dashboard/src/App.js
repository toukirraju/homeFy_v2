import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Authentication from "./pages/authentication/Authentication";
import AppRoutes from "./AppRoutes";
import { useSelector } from "react-redux";
import AuthVerify from "./utility/AuthVerify";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <AuthVerify />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        // theme="colored"
      />
      {user ? (
        <>
          {/* if user have role */}
          {(user?.user.role === "owner" || user?.user.role === "manager") && (
            <AppRoutes user={user} />
          )}
        </>
      ) : (
        <>
          <Routes>
            <Route path="/auth" element={<Authentication />} />
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
