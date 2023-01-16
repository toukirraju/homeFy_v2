import Style from "./styles/Profile.module.css";
import PostSide from "../../Components/profile/postSide/PostSide";
import ProfileLeft from "./components/profileLeft/ProfileLeft";
import { useSelector } from "react-redux";
import UserBillTable from "../../Components/tables/UserBillTable";
import ProfileNav from "../../Components/Navigation/profile_navigation/ProfileNav";
import { Tabs } from "@mantine/core";
import ProfileCard from "./components/profileCard/ProfileCard";
import HomeInfoCard from "./components/homeInfoCard/HomeInfoCard";
import { useState } from "react";
import CreateNewHouseIModal from "./modals/CreateNewHouseIModal";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <>
      <div className="headerContainer">
        <div className={`card  ${Style.profile_Header}`}>
          <div className={Style.profile__nav}>
            <ProfileNav />
          </div>
        </div>

        {/* <div className="Profile-center">
          <PostSide />
        </div> */}
        {/* <div className="Profile__right">
          <RightSide />
        </div>
        <div className="Profile__left">
          <ProfileLeft />
        </div> */}
      </div>
      <div className={Style.tab__sections}>
        <Tabs variant="pills" defaultValue="houseInfo">
          <Tabs.List>
            <Tabs.Tab color="blue" value="houseInfo">
              House Info
            </Tabs.Tab>

            <Tabs.Tab color="blue" value="post">
              Post
            </Tabs.Tab>
            <Tabs.Tab color="blue" value="profile">
              Profile
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="houseInfo">
            <button
              className={Style.house__create_button}
              onClick={() => setModalOpened(true)}
            >
              create new house
            </button>
            <CreateNewHouseIModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
            />
            <div className={Style.house_info_wrapper}>
              <HomeInfoCard />
              <HomeInfoCard />
              <HomeInfoCard />
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="post">
            <div className={Style.Posts__wrapper}>
              <PostSide />
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="profile">
            <div className={` ${Style.profile__sections}`}>
              <ProfileCard />
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </>
  );
};

export default Profile;
