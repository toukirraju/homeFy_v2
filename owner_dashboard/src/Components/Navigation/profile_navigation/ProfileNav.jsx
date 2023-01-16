import React from "react";
import Style from "./ProfileNav.module.css";

import Home from "../../../assets/home.png";
import Noti from "../../../assets/noti.png";
import Comment from "../../../assets/comment.png";

import { UilSetting, UilSignOutAlt } from "@iconscout/react-unicons";

import { Link, useNavigate } from "react-router-dom";

const ProfileNav = () => {
  const navigate = useNavigate();
  return (
    <div className={`${Style.RightSide}`}>
      <div className={Style.navIcons}>
        {/* <Link
          to={`../home`}
          style={{ textDecoration: "none", color: "inherit" }}
        > */}
        <img src={Home} alt="" onClick={() => navigate("/")} />
        {/* </Link> */}
        {/* <UilSetting /> */}
        <img src={Noti} alt="" />
        <img src={Comment} alt="" onClick={() => navigate("/message")} />
        <span>
          <UilSignOutAlt />
        </span>
      </div>
    </div>
  );
};

export default ProfileNav;
