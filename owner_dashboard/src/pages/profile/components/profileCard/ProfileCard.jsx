import React, { useState } from "react";
import "./ProfileCard.css";
import Profle from "../../../../assets/userlogo.png";
import { Link } from "react-router-dom";
import { UilUserCircle, UilPen } from "@iconscout/react-unicons";
import ProfileUpdateModal from "../../modals/ProfileUpdateModal";
import { useSelector } from "react-redux";
// import { useMediaQuery } from "@mantine/hooks";

const ProfileCard = ({ data }) => {
  // const isMobile = useMediaQuery("(max-width: 768px)");
  const [modalOpened, setModalOpened] = useState(false);
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="card ProfileCard_wrapper">
      <div className="Profile__image__section">
        <div className="profile_image">
          <img src={Profle} alt="" />
        </div>
        <div className="image__upload">
          <input type="file" />
        </div>
      </div>
      <div className="edit__button">
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
      <div className="Profile__info__section">
        <div>
          <span>Name:</span>
          Mr. Ali
        </div>
        <div>
          {" "}
          <span>Phone:</span>
          019444654434
        </div>
        <div>
          <span>Nid:</span>
          25346455767
        </div>
        <div>
          <span>Profession:</span>
          Businessman
        </div>
        <div>
          <span>Role:</span>
          House Owner
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
