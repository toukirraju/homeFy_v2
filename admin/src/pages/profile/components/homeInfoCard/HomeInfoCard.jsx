import React, { useState } from "react";
import "./HomeInfoCard.css";
import logo from "../../../../assets/homeFylogo.png";
import { Link } from "react-router-dom";
import {
  UilCheckCircle,
  UilFileTimesAlt,
  UilFileCheckAlt,
  UilPen,
} from "@iconscout/react-unicons";
// import HouseInfoUpdateModal from "../../modals/UpdateSubAdminModal";
// import { useMediaQuery } from "@mantine/hooks";

const HomeInfoCard = ({ data }) => {
  // const isMobile = useMediaQuery("(max-width: 768px)");
  const [modalOpened, setModalOpened] = useState(false);
  const [isVerified, setisVerified] = useState(true);
  const [isDefault, setisDefault] = useState(true);
  return (
    <div className="card ProfileCard_wrapper">
      <div className="Profile__image__section">
        <div className="profile_image">
          <img src={logo} alt="" />
        </div>
        <div className="image__upload">
          <input type="file" />
        </div>
      </div>
      <div className="edit__button">
        {isDefault ? (
          <UilCheckCircle color="var(--orange)" width="2rem" />
        ) : (
          <UilCheckCircle width="2rem" />
        )}
        {isVerified ? (
          <UilFileCheckAlt color="green" width="2rem" />
        ) : (
          <UilFileTimesAlt color="red" width="2rem" />
        )}

        <button className="">
          <UilPen
            width="2rem"
            height="1.2rem"
            onClick={() => setModalOpened(true)}
          />
        </button>
        {/* <HouseInfoUpdateModal
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
          homeData={[]}
        /> */}
      </div>

      <div className="Profile__info__section">
        <div>
          <span>House Name:</span>
          ChayaNirr
        </div>
        <div>
          {" "}
          <span>House No:</span>
          241/1
        </div>
        <div>
          <span>Village/Town:</span>
          Laxmipura
        </div>
        <div>
          <span>District:</span>
          Gazipur
        </div>
        <div>
          <span>Division:</span>
          Dhaka
        </div>
        <div>
          <span>Number of floors:</span>6
        </div>
        <div>
          <span>Number of apartments:</span>
          12
        </div>
      </div>
    </div>
  );
};

export default HomeInfoCard;
