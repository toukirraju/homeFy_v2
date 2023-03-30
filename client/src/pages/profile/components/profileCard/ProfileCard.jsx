import React from "react";
import "./ProfileCard.css";
import Cover from "../../../../assets/cover.jpg";
import Profle from "../../../../assets/user.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UilUserCircle } from "@iconscout/react-unicons";
import { useMediaQuery } from "@mantine/hooks";

const ProfileCard = ({ data }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="card ProfileCard">
      <div className="ProfileImages">
        <img src={Cover} alt="" />
        <img src={Profle} alt="" />
      </div>
      <div className="ProfileName">
        <span>{user?.fullname}</span>

        {/* <div className="follow">
          <span>{user?.user?.bills.length}</span>
          <span>House Name</span>
        </div> */}
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user?.bills.length}</span>
            <span>Bills</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user?.advanceRent ? user?.advanceRent : 0}</span>
            <span>Advance Pay</span>
          </div>
        </div>
        <hr />
      </div>

      <span>
        <Link
          to={`/profile`}
          className="LinkUnset__hover"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {isMobile ? <UilUserCircle /> : "My Profile "}
        </Link>
      </span>
    </div>
  );
};

export default ProfileCard;
