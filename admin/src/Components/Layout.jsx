import Sidebar from "./Navigation/sidebar/Sidebar";
import styles from "../Styles/Layout.module.css";
import Navbar from "./Navigation/Navbar";

const Layout = ({ children }) => {
  return (
    <div className={`h-screen ${styles.layout__container} `}>
      <div>
        <Sidebar />
      </div>
      <div className="w-full lg:mx-2">
        <Navbar />
        <div className="h-[calc(100vh-120px)] lg:h-[calc(100vh-80px)] overflow-y-auto mt-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
