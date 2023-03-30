import HomeStyle from "../../pages/home/styles/Home.module.css";
import logo from "../../assets/homeFylogo.png";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";

import { UilUserCircle } from "@iconscout/react-unicons";
import useAuth from "../../hooks/useAuth";

const LeftTitleHeader = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isLoggedIn = useAuth();

  return (
    <div className={`card ${HomeStyle.leftSide__header}`}>
      <img src={logo} alt="logo" />
      <Link
        to={`/home`}
        className="LinkUnset__hover"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <h2 className="title">Homefy</h2>
      </Link>
      <span>
        <Link
          to={`/profile`}
          className="LinkUnset__hover"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {isMobile && isLoggedIn && <UilUserCircle />}
        </Link>
      </span>
    </div>
  );
};

export default LeftTitleHeader;
