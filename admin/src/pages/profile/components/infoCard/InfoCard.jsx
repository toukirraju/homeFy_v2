import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileUpdateModal from "../../modals/ProfileUpdateModal";
// import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const InfoCard = () => {
  // const dispatch = useDispatch();
  // const params = useParams();
  const [modalOpened, setModalOpened] = useState(false);
  const { user } = useSelector((state) => state.auth.user);

  // const profileUserId = params.id;
  // const [profileUser, setProfileUser] = useState({});

  // const { user } = useSelector((state) => state.authReducer.authData);

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {/* {user._id === profileUserId ? ( */}
        <div>
          <UilPen
            width="2rem"
            height="1.2rem"
            onClick={() => setModalOpened(true)}
          />
          <ProfileUpdateModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
            data={user}
          />
        </div>
        {/* ) : (
          ""
        )} */}
      </div>
      <div className="info">
        <span>
          <b>{user.firstname} </b>
        </span>
        <span>
          <b>{user.lastname}</b>
        </span>
      </div>
      <div className="info">
        <span>
          <b>Username </b>
        </span>
        <span>{user.username}</span>
      </div>

      <div className="info">
        <span>
          <b>Phone No </b>
        </span>
        <span>{user.phoneNo}</span>
      </div>
      <div className="info">
        <span>
          <b>Role </b>
        </span>
        <span>{user.role}</span>
      </div>
      <div className="info">
        <span>
          <b>Livesin </b>
        </span>
        <span>{user.livesin}</span>
      </div>

      {/* <button
        className="button loggout-button"
        // onClick={handleLogOut}
      >
        Logout
      </button> */}
    </div>
  );
};

export default InfoCard;
