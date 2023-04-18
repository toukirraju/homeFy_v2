import Style from "./styles/Profile.module.css";
import { useState } from "react";
import UserBillTable from "./components/table/UserBillTable";
import LeftTitleHeader from "../../Components/leftSide/LeftTitleHeader";
import RightNavBar from "../../Components/navigationBar/RightNavBar";
import BarChartCompo from "./components/Charts/BarChartCompo";
import UserIntroCard from "./components/UserIntroCard";
import ApartmentInfoCard from "./components/apartmentInfoCard/ApartmentInfoCard";
import DropdownActionButton from "../../Components/UI/ActionButtons/DropdownActionButton";
import { useMediaQuery } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { UilBuilding, UilBill, UilLayerGroup } from "@iconscout/react-unicons";
import BillinfoCard from "./components/billInfoCard/BillinfoCard";
import { useGetProfileInfoQuery } from "../../redux/features/profile/profileRTKquery";
import ApartmentCardLoader from "../../Components/loader/ApartmentCardLoader";
import BillInfoLoader from "../../Components/loader/BillInfoLoader";
import ProfileIntroLoader from "../../Components/loader/ProfileIntroLoader";
import BarchartLoader from "../../Components/loader/BarchartLoader";
import TableLoader from "../../Components/loader/TableLoader";
import ErrorMessage from "../../Components/UI/Error/ErrorMessage";

const Profile = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isOpen, setIsOpen] = useState({
    apartmentInfo: false,
    billInfo: false,
  });
  const { data: profile, isLoading, isError, error } = useGetProfileInfoQuery();

  // decide what to render

  let profileIntro = null;
  let apartment = null;
  let billinfo = null;
  let chart = null;
  let table = null;

  if (isLoading && !isError) {
    profileIntro = <ProfileIntroLoader />;
    apartment = <ApartmentCardLoader />;
    billinfo = <BillInfoLoader />;
    chart = <BarchartLoader />;
    table = <TableLoader />;
  }
  if (!isLoading && isError) {
    profileIntro = <ErrorMessage message={error?.data?.message} />;
    // apartment = <h3>There is an error to getting Apartment info</h3>;
    // billinfo = <h3>There is an error to getting bill info</h3>;
    // chart = <h3>There is an error to getting chart info</h3>;
    // table = <h3>There is an error to getting table info</h3>;
  }
  if (!isLoading && !isError && profile._id) {
    profileIntro = <UserIntroCard data={profile} />;
    apartment = (
      <>
        {!isMobile && Object.keys(profile).length !== 0 && (
          <ApartmentInfoCard data={profile.apartment} />
        )}
      </>
    );
    billinfo = (
      <>
        {!isMobile && Object.keys(profile).length !== 0 && (
          <BillinfoCard data={profile.apartment} />
        )}
      </>
    );

    chart = (
      <>
        {Object.keys(profile).length !== 0 && (
          <BarChartCompo data={profile.bills} />
        )}
      </>
    );
    table = (
      <>
        {Object.keys(profile).length !== 0 && (
          <UserBillTable data={profile.bills} />
        )}
      </>
    );
  }

  // Action button handler
  const handleActionButtonSelect = (option) => {
    if (option.value === 1) {
      setIsOpen({ ...isOpen, apartmentInfo: true });
    } else if (option.value === 2) {
      setIsOpen({ ...isOpen, billInfo: true });
    }
  };
  // Action button options
  const options = [
    { label: <UilBuilding />, value: 1 },
    { label: <UilBill />, value: 2 },
  ];
  return (
    <>
      <div className={Style.Profile__wrapper}>
        <div className={Style.Profile__left}>
          <LeftTitleHeader />
          {apartment}
        </div>
        <div className={Style.Profile__center}>
          {/* <Profile Intro Card /> */}
          {/* <ErrorMessage /> */}
          {profileIntro}
          <div className={` ${Style.user__chart}`}> {chart}</div>
          <div className={` ${Style.bill__table}`}>{table}</div>
        </div>
        <div className={Style.Profile__right}>
          {/* <RightSide /> */}
          <RightNavBar />
          {billinfo}
        </div>
      </div>
      {isMobile && (
        <>
          <Modal
            classNames={{
              modal: `modal__Body`,
              title: `modal__title`,
              close: `modal__close`,
            }}
            size="lg"
            opened={isOpen.apartmentInfo}
            onClose={() => setIsOpen({ ...isOpen, apartmentInfo: false })}
          >
            <ApartmentInfoCard data={profile?.apartment} />
          </Modal>
          <Modal
            classNames={{
              modal: `modal__Body`,
              title: `modal__title`,
              close: `modal__close`,
            }}
            size="lg"
            opened={isOpen.billInfo}
            onClose={() => setIsOpen({ ...isOpen, billInfo: false })}
          >
            <BillinfoCard data={profile?.apartment} />
          </Modal>

          <DropdownActionButton
            label={<UilLayerGroup />}
            options={options}
            onOptionSelect={handleActionButtonSelect}
          />
        </>
      )}
    </>
  );
};

export default Profile;
