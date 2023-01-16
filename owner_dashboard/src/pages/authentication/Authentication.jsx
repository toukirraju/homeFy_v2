import LoginForm from "./components/LoginForm";
import Style from "./styles/loginPage.module.css";
import logo from "../../assets/homefyDashboardLogo.png";
import { useNavigate } from "react-router-dom";
const Authentication = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={Style.wrapper}>
        <div className={Style.logo__side}>
          <img
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
            src={logo}
            alt=""
          />
        </div>
        <div className={Style.form__side}>
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default Authentication;
