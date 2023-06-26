import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Authentication from "./pages/authentication/Authentication";
import Home from "./pages/home/Home";
import Redirect from "./Redirect";
import AppRoutes from "./AppRoutes";
import { useSelector } from "react-redux";
import AuthVerify from "./utility/AuthVerify";
import Layout from "./Components/Layout";

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <AuthVerify />
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
      {user ? (
        <>{user?.user.roles && <AppRoutes user={user} />}</>
      ) : (
        <>
          <Routes>
            <Route path="/auth" element={<Authentication />} />
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </Routes>
        </>
      )}
      {/* <Layout /> */}
    </>
  );
}

export default App;
