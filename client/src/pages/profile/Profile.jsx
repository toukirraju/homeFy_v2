import Style from "./styles/Profile.module.css";
import ProfileLeft from "../../Components/profile/profileLeft/ProfileLeft";
import RightSide from "../../Components/profile/rightSide/RightSide";
import { useSelector } from "react-redux";
import UserBillTable from "./components/table/UserBillTable";
import LeftTitleHeader from "../../Components/leftSide/LeftTitleHeader";
import RightNavBar from "../../Components/navigationBar/RightNavBar";
import ProfileCard from "./components/profileCard/ProfileCard";
import BarChartCompo from "./components/Charts/BarChartCompo";
import UserIntroCard from "./components/UserIntroCard";
import ApartmentInfoCard from "./components/apartmentInfoCard/ApartmentInfoCard";
import DropdownActionButton from "../../Components/UI/ActionButtons/DropdownActionButton";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { Modal } from "@mantine/core";
import {
  UilPhoneAlt,
  UilMapMarker,
  UilEnvelope,
  UilPostcard,
  UilEstate,
  UilChatBubbleUser,
  UilEdit,
  UilBuilding,
  UilBill,
  UilLayerGroup,
} from "@iconscout/react-unicons";
import BillinfoCard from "./components/billInfoCard/BillinfoCard";

const Profile = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isOpen, setIsOpen] = useState({
    apartmentInfo: false,
    billInfo: false,
  });

  const handleOptionSelect = (option) => {
    if (option.value === 1) {
      setIsOpen({ ...isOpen, apartmentInfo: true });
    } else if (option.value === 2) {
      setIsOpen({ ...isOpen, billInfo: true });
    }
  };

  const options = [
    { label: <UilBuilding />, value: 1 },
    { label: <UilBill />, value: 2 },
  ];
  return (
    <>
      <div className={Style.Profile__wrapper}>
        <div className={Style.Profile__left}>
          <LeftTitleHeader />
          {!isMobile && <ApartmentInfoCard />}
        </div>
        <div className={Style.Profile__center}>
          {/* <Profile Intro Card /> */}
          <UserIntroCard />
          <div className={` ${Style.user__chart}`}>
            {" "}
            <BarChartCompo />
          </div>
          <div className={` ${Style.bill__table}`}>
            <UserBillTable data={[]} />
          </div>

          {/* <UserBillTable /> */}
        </div>
        <div className={Style.Profile__right}>
          {/* <RightSide /> */}
          <RightNavBar />
          {!isMobile && <BillinfoCard />}
        </div>
      </div>
      {isMobile && (
        <>
          <Modal
            size="lg"
            opened={isOpen.apartmentInfo}
            onClose={() => setIsOpen({ ...isOpen, apartmentInfo: false })}
          >
            <ApartmentInfoCard />
          </Modal>
          <Modal
            size="lg"
            opened={isOpen.billInfo}
            onClose={() => setIsOpen({ ...isOpen, billInfo: false })}
          >
            <BillinfoCard />
          </Modal>

          <DropdownActionButton
            label={<UilLayerGroup />}
            options={options}
            onOptionSelect={handleOptionSelect}
          />
        </>
      )}
    </>
  );
};

export default Profile;
