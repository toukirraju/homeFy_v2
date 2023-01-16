import React from "react";
import "./ProfileCard.css";
import Cover from "../../../../assets/cover.jpg";
import Profle from "../../../../assets/profileImg.jpg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UilUserCircle } from "@iconscout/react-unicons";
import { useMediaQuery } from "@mantine/hooks";

const ProfileCard = ({ data }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  // const { user } = useSelector((state) => state.authReducer.authData);
  // const posts = useSelector((state) => state.postReducer.posts);
  // const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="card ProfileCard">
      <div className="ProfileImages">
        <img src={Cover} alt="" />
        <img src={Profle} alt="" />
      </div>
      <div className="ProfileName">
        <span>Kamal Ali</span>
        <span> Write about yourself</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>5</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>6</span>
            <span>Followers</span>
          </div>
          {data === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>6</span>
                <span>Posts</span>
              </div>
            </>
          )}
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
