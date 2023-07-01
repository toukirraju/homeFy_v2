import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./AppRoutes";
import useAuthCheck from "./hooks/useAuthCheck";

function App() {
  const authChecked = useAuthCheck();
  return !authChecked ? (
    <div>Checking authentication.......</div>
  ) : (
    <>
      {/* <AuthVerify /> */}
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
      <AppRoutes />
    </>
  );
}

export default App;
