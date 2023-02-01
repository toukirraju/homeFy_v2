import Style from "./styles/Profile.module.css";
import PostSide from "../../Components/profile/postSide/PostSide";
import { useSelector } from "react-redux";
import UserBillTable from "../../Components/tables/UserBillTable";
import ProfileNav from "../../Components/Navigation/profile_navigation/ProfileNav";
import { Tabs } from "@mantine/core";
import ProfileCard from "./components/profileCard/ProfileCard";
import { useState } from "react";
import CreateSubAdminModal from "./modals/CreateSubAdminModal";
import HouseInfoTable from "./components/tables/HouseInfoTable";
import {
  houseInfoData,
  adminData,
  OwnerData,
  UsersData,
  postData,
} from "./Data";
import HousesLineChart from "./components/charts/HousesLineChart";
import PieChart from "./components/charts/PieChart";
import TotalHouseWidget from "./components/widgets/TotalHouseWidget";
import AdminTable from "./components/tables/AdminTable";
import OwnersTable from "./components/tables/OwnersTable";
import UsersTable from "./components/tables/UsersTable";
import PostLineChart from "./components/charts/PostLineChart";
import RegionalPostBarChart from "./components/charts/RegionalPostBarChart";
import PostListTable from "./components/tables/PostListTable";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  // console.log(user);
  const [modalOpened, setModalOpened] = useState(false);
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
        <Tabs variant="pills" defaultValue="houseInfo">
          <Tabs.List>
            <Tabs.Tab color="blue" value="houseInfo">
              House
            </Tabs.Tab>

            <Tabs.Tab color="blue" value="post">
              Post
            </Tabs.Tab>
            <Tabs.Tab color="blue" value="profile">
              Profile
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="houseInfo">
            <div className={Style.house_info_wrapper}>
              <div className={Style.widgets}>
                <div className={Style.left_widget_container}>
                  <HousesLineChart />
                </div>
                <div className={Style.right_widget_container}>
                  <TotalHouseWidget />
                </div>
              </div>
              <HouseInfoTable data={houseInfoData} />

              <div>4. super admin can approve post</div>
              <div>
                5. super admin can verify home "after verify home owner can post
                publicly"
              </div>
            </div>
            {/* <button
              className={Style.house__create_button}
              onClick={() => setModalOpened(true)}
            >
              create new house
            </button>
            <CreateSubAdminModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
            />
            <div className={Style.house_info_wrapper}>
              <HomeInfoCard />
              <HomeInfoCard />
              <HomeInfoCard />
            </div> */}
          </Tabs.Panel>
          <Tabs.Panel value="post">
            <div className={Style.Posts__section}>
              <div className={Style.post_container_1}>
                <div className={Style.left_container}>
                  <PostLineChart />
                </div>
                <div className={Style.right_container}>
                  <RegionalPostBarChart />
                </div>
              </div>
              <div className={Style.post_container_2}>
                <PostListTable data={postData} />
              </div>
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="profile">
            <div className={` ${Style.profile__sections}`}>
              <button
                className={Style.create_button}
                onClick={() => setModalOpened(true)}
              >
                create new Sub admin
              </button>
              <CreateSubAdminModal
                modalOpened={modalOpened}
                setModalOpened={setModalOpened}
              />
              <div className={` ${Style.profile_wrapper}`}>
                <div className={` ${Style.container_1}`}>
                  <div className={` ${Style.left_side}`}>
                    <AdminTable data={adminData} />
                  </div>
                  <div className={` ${Style.right_side}`}>
                    <ProfileCard data={user?.user} />
                  </div>
                </div>
                <div className={` ${Style.container_2}`}>
                  <OwnersTable data={OwnerData} />
                </div>
                <div className={` ${Style.container_3}`}>
                  <UsersTable data={UsersData} />
                </div>
              </div>
              <div>1. super admin can create/update/delete sub-admin</div>
              <div>2. super admin can assign role for sub-admin</div>
              <div>3. super admin can active/deactivate user account</div>
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </>
  );
};

export default Profile;
