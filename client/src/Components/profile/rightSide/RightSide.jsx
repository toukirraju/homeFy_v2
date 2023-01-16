import React from "react";
import "./RightSide.css";

import Home from "../../../assets/home.png";
import Noti from "../../../assets/noti.png";
import Comment from "../../../assets/comment.png";

import { UilSetting, UilSignOutAlt } from "@iconscout/react-unicons";

import { Link, useNavigate } from "react-router-dom";

const RightSide = () => {
  const navigate = useNavigate();
  return (
    <div className="card RightSide">
      <div className="navIcons">
        {/* <Link
          to={`../home`}
          style={{ textDecoration: "none", color: "inherit" }}
        > */}
        <img src={Home} alt="" onClick={() => navigate("/")} />
        {/* </Link> */}
        {/* <UilSetting /> */}
        <img src={Noti} alt="" />
        <img src={Comment} alt="" onClick={() => navigate("/message")} />
        <UilSignOutAlt />
      </div>

      {/* <button className="button r-button">Share</button> */}
    </div>
  );
};

export default RightSide;
