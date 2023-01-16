import React, { useEffect, useState } from "react";
import "./HomeInfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import HouseInfoModal from "../../modals/HouseInfoModal";
import { OwnerInfo } from "../../../redux/slices/ownerSlice";

const HomeInfoCard = () => {
  const dispatch = useDispatch();
  const [modalOpened, setModalOpened] = useState(false);
  const { houseData } = useSelector((state) => state.houseInfo);
  const { user } = useSelector((state) => state.auth.user);
  const [houseInfoData, setHouseInfoData] = useState({});
  useEffect(() => {
    const fetchHouseInfo = async () => {
      const houseInfo = await dispatch(OwnerInfo({ _id: user._id }));

      setHouseInfoData(houseInfo.payload.houseData);
    };
    fetchHouseInfo();
  }, []);
  return (
    <div className="HomeInfoCard">
      <div className="infoHead">
        <h4>House Info</h4>
        <div>
          <UilPen
            width="2rem"
            height="1.2rem"
            onClick={() => setModalOpened(true)}
          />
          <HouseInfoModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
            homeData={houseData ? houseData : houseInfoData}
          />
        </div>
      </div>
      <div className="info">
        <span>
          <b>House Name </b>
        </span>
        <span>{houseData ? houseData.houseName : "ChayaNirr"}</span>
      </div>

      <div className="info">
        <span>
          <b>House No </b>
        </span>
        <span>{houseData ? houseData.houseNo : "241/1"}</span>
      </div>
      <div className="info">
        <span>
          <b>Village </b>
        </span>
        <span>{houseData ? houseData.village : "Laxmipura, Joydebpur"}</span>
      </div>
      <div className="info">
        <span>
          <b>District </b>
        </span>
        <span>{houseData ? houseData.district : "Gazipur 1700"}</span>
      </div>
      <div className="info">
        <span>
          <b>Division </b>
        </span>
        <span>{houseData ? houseData.division : "Dhaka"}</span>
      </div>
    </div>
  );
};

export default HomeInfoCard;
