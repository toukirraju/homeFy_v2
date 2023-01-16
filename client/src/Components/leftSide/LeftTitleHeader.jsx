import HomeStyle from "../../pages/home/styles/Home.module.css";
import logo from "../../assets/homeFylogo.png";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";

import { UilUserCircle } from "@iconscout/react-unicons";
import { useSelector } from "react-redux";

const LeftTitleHeader = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { user } = useSelector((state) => state.auth);
  return (
    <div className={`card ${HomeStyle.leftSide__header}`}>
      <img src={logo} alt="logo" />
      <h2 className="title">Homefy</h2>
      <span>
        <Link
          to={`/profile`}
          className="LinkUnset__hover"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {isMobile && user && <UilUserCircle />}
        </Link>
      </span>
    </div>
  );
};

export default LeftTitleHeader;
