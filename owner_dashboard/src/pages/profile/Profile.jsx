import Style from "./styles/Profile.module.css";
import PostSide from "../../Components/profile/postSide/PostSide";
import { useDispatch, useSelector } from "react-redux";
import ProfileNav from "../../Components/Navigation/profile_navigation/ProfileNav";
import { Tabs } from "@mantine/core";
import ProfileCard from "./components/profileCard/ProfileCard";
import HomeInfoCard from "./components/homeInfoCard/HomeInfoCard";
import { useState } from "react";
import CreateNewHouseIModal from "./modals/CreateNewHouseIModal";
import ManagersTable from "./components/tables/ManagersTable";
import SearchOutput from "./components/searchOutputCard/SearchOutput";
import { useEffect } from "react";
import {
  GetHouses,
  GetManagers,
  SearchManager,
} from "../../redux/slices/ownerSlice";
import SearchSection from "./components/searchSection/SearchSection";

const Profile = () => {
  const dispatch = useDispatch();
  const { profileData, houses, managers } = useSelector((state) => state.owner);
  const [modalOpened, setModalOpened] = useState(false);
  // console.log(searchValue);
  useEffect(() => {
    dispatch(GetHouses());
    dispatch(GetManagers());
  }, []);

  return (
    <>
      <div className="headerContainer">
        <div className={`card  ${Style.profile_Header}`}>
          <div className={Style.profile__nav}>
            <ProfileNav />
          </div>
        </div>
      </div>
      <div className={Style.tab__sections}>
        <Tabs variant="pills" defaultValue="profile">
          <Tabs.List>
            <Tabs.Tab color="blue" value="profile">
              Profile
            </Tabs.Tab>

            <Tabs.Tab color="blue" value="houseInfo">
              House Info
            </Tabs.Tab>

            <Tabs.Tab color="blue" value="post">
              Post
            </Tabs.Tab>
          </Tabs.List>

          {/******************  tab panal for profile section  ******************/}
          <Tabs.Panel value="profile">
            <div className={` ${Style.profile__sections}`}>
              <div className={` ${Style.profile_container_1}`}>
                <div className={` ${Style.profile_left}`}>
                  <ProfileCard data={profileData} />
                </div>
                <div className={` ${Style.profile_right}`}>
                  <SearchSection />
                </div>
              </div>
              <div className={` ${Style.profile_container_2}`}>
                <ManagersTable data={managers} />
              </div>
            </div>
          </Tabs.Panel>

          {/******************  tab panal for house section  ******************/}
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
              {houses.map((house, index) => (
                <div key={index}>
                  <HomeInfoCard data={house} />
                </div>
              ))}

              {/* <HomeInfoCard />
              <HomeInfoCard /> */}
            </div>
          </Tabs.Panel>

          {/******************  tab panal for post section  ******************/}
          <Tabs.Panel value="post">
            <div className={Style.Posts__wrapper}>
              <PostSide />
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </>
  );
};

export default Profile;
