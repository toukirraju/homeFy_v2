import LoginForm from "./components/LoginForm";
import logo from "../../assets/homeFy_admin_Logo.png";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "../../Components/DarkModeToggle";
const Authentication = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen flex md:justify-around items-center justify-center  flex-col md:flex-row">
      <div className="w-full flex justify-center">
        <img
          className="w-2/3"
          onClick={() => navigate("/")}
          src={logo}
          alt=""
        />
      </div>
      <div className="w-full flex justify-center">
        <LoginForm />
      </div>
      <div className="absolute top-4 right-4">
        <DarkModeToggle />
      </div>
    </div>
  );
};

export default Authentication;
