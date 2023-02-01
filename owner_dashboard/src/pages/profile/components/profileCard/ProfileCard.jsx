import React, { useState } from "react";
import Style from "./ProfileCard.module.css";
import Profle from "../../../../assets/userlogo.png";
import { Link } from "react-router-dom";
import { UilUserCircle, UilPen } from "@iconscout/react-unicons";
import ProfileUpdateModal from "../../modals/ProfileUpdateModal";
import { useSelector } from "react-redux";
// import { useMediaQuery } from "@mantine/hooks";

const ProfileCard = ({ data }) => {
  // const isMobile = useMediaQuery("(max-width: 768px)");

  const [modalOpened, setModalOpened] = useState(false);
  // const { user } = useSelector((state) => state.auth);
  return (
    <div className={`card ${Style.ProfileCard_wrapper}`}>
      <div className={` ${Style.Profile__image__section}`}>
        <div className={` ${Style.profile_image}`}>
          <img src={Profle} alt="" />
        </div>
        <div className={` ${Style.image__upload}`}>
          <input type="file" />
        </div>
      </div>
      <div className={` ${Style.edit__button}`}>
        <UilPen
          width="2rem"
          height="1.2rem"
          onClick={() => setModalOpened(true)}
        />
        <ProfileUpdateModal
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
          data={data}
        />
      </div>
      <div className={` ${Style.Profile__info__section}`}>
        <div>
          <span>Name:</span>
          {data.firstname + " " + data.lastname}
        </div>
        <div>
          {" "}
          <span>Phone:</span>
          {data.phone}
        </div>
        <div>
          <span>Nid:</span>
          {data.nid}
        </div>
        <div>
          <span>Profession:</span>
          {data.profession}
        </div>
        <div>
          <span>Role:</span>
          House {data.role}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
