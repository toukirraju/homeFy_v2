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
import HouseInfoUpdateModal from "../../modals/HouseInfoUpdateModal";
import DefaultHousePopupModal from "../../modals/DefaultHousePopUpModal";
// import { useMediaQuery } from "@mantine/hooks";

const HomeInfoCard = ({ data }) => {
  // const isMobile = useMediaQuery("(max-width: 768px)");
  const [modalOpened, setModalOpened] = useState(false);
  const [defaultPopUpModalOpened, setDefaultPopUpModalOpened] = useState(false);
  const [isVerified, setisVerified] = useState(true);
  // console.log(data?.address);
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
        <DefaultHousePopupModal
          defaultPopUpModalOpened={defaultPopUpModalOpened}
          setDefaultPopUpModalOpened={setDefaultPopUpModalOpened}
          data={data}
        />
        {data.isDefault ? (
          <UilCheckCircle color="var(--orange)" width="2rem" />
        ) : (
          <UilCheckCircle
            width="2rem"
            cursor="pointer"
            onClick={() => setDefaultPopUpModalOpened(true)}
          />
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
        <HouseInfoUpdateModal
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
          data={data}
        />
      </div>

      <div className="Profile__info__section">
        <div>
          <span>House Name:</span>
          {data.houseName}
        </div>
        <div>
          {" "}
          <span>House No:</span>
          {data.houseNo}
        </div>
        <div>
          <span>Address:</span>
          {data?.address?.address_display_name}
        </div>
        <div>
          <span>Division:</span>
          {data?.address?.state}
        </div>
        <div>
          <span>District:</span>
          {data?.address?.state_district}
        </div>
        <div>
          <span>Postcode:</span>
          {data?.address?.postCode ? data?.address?.postCode : ""}
        </div>

        <div>
          <span>Number of floors:</span>
          {data.number_of_floors}
        </div>
        <div>
          <span>Number of apartments:</span>
          {data.number_of_apartments}
        </div>
      </div>
    </div>
  );
};

export default HomeInfoCard;
