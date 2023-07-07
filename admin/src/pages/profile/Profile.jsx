import Style from "./styles/Profile.module.css";
import { useSelector } from "react-redux";
import { Tabs } from "@mantine/core";
import ProfileCard from "./components/profileCard/ProfileCard";
import { useState } from "react";
import CreateSubAdminModal from "./modals/CreateSubAdminModal";
import { houseInfoData, adminData, OwnerData, UsersData } from "./Data";
import AdminTable from "./components/tables/AdminTable";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  // console.log(user);
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <>
      <div className={Style.tab__sections}>
        <Tabs variant="pills" defaultValue="profile">
          <Tabs.List>
            <Tabs.Tab color="blue" value="profile">
              Profile
            </Tabs.Tab>
            <Tabs.Tab color="blue" value="admins">
              Admin
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="profile">
            <div className={` ${Style.profile__sections}`}>
              <ProfileCard data={user} />
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="admins">
            <div className={` ${Style.profile__sections}`}>
              <button className="" onClick={() => setModalOpened(true)}>
                create new Sub admin
              </button>
              <CreateSubAdminModal
                modalOpened={modalOpened}
                setModalOpened={setModalOpened}
              />
              <div>
                <AdminTable data={adminData} />
              </div>
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </>
  );
};

export default Profile;
