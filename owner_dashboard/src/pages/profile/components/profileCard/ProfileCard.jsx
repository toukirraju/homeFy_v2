import React, { useState } from "react";
import Style from "./ProfileCard.module.css";
import Profle from "../../../../assets/userlogo.png";
import { Link } from "react-router-dom";
import {
  UilHouseUser,
  UilPhoneAlt,
  UilUser,
  UilPen,
  UilPostcard,
  UilBriefcaseAlt,
  UilUserExclamation,
} from "@iconscout/react-unicons";
import ProfileUpdateModal from "../../modals/ProfileUpdateModal";
import { useSelector } from "react-redux";
import PostWidget from "../../../../Components/postComponents/PostWidget";
// import { useMediaQuery } from "@mantine/hooks";

const ProfileCard = ({ data }) => {
  // const isMobile = useMediaQuery("(max-width: 768px)");
  const { widgetData, specificPosts } = useSelector((state) => state.posts);

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

      <div className={` ${Style.Post__widget__header}`}>
        <div className={`${Style.owner__container__body}`}>
          <div className={`${Style.owner_content}`}>
            <span>
              <UilUser />
            </span>
            <span>{data.firstname + " " + data.lastname}</span>
          </div>
          <div className={`${Style.owner_content}`}>
            <span>
              <UilPhoneAlt />{" "}
            </span>
            <span> {data.phone}</span>
          </div>
        </div>
        <div className={`${Style.owner__container__body}`}>
          <div className={`${Style.owner_content}`}>
            <span>
              <UilPostcard />
            </span>
            <span>{data.nid}</span>
          </div>
        </div>
        <div className={`${Style.owner__container__body}`}>
          <div className={`${Style.owner_content}`}>
            <span>
              <UilBriefcaseAlt />
            </span>
            <span> {data.profession}</span>
          </div>
          <div className={`${Style.owner_content}`}>
            <span>
              <UilUserExclamation />{" "}
            </span>
            <span> {data.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
