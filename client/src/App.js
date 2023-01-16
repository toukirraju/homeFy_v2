import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Authentication from "./pages/authentication/Authentication";
import Home from "./pages/home/Home";
import Redirect from "./Redirect";
import { useSelector } from "react-redux";
import AppRoutes from "./AppRoutes";
import AuthVerify from "./utility/AuthVerify";

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
        <>
          {/* if user have role */}
          {user?.user.role === undefined && <AppRoutes user={user} />}
          {/* {user?.user.role === undefined && (
            <Redirect destination="http://localhost:3000" />
          )} */}
        </>
      ) : (
        <>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </>
      )}
    </>
    // <div className="App">
    //   <Routes>
    //     <Route path="/" element={<Home />} />

    //     <Route path="auth" element={<Authentication />} />

    //     <Route
    //       path="/dashboard"
    //       element={<Redirect destination="http://localhost:3000" />}
    //     />
    //   </Routes>
    // </div>
  );
}

export default App;
