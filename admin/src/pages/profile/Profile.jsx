import { useSelector } from "react-redux";
import { Tabs } from "@mantine/core";
import ProfileCard from "./components/profileCard/ProfileCard";
import { useState } from "react";
import CreateSubAdminModal from "./modals/CreateSubAdminModal";
import AdminTable from "./components/tables/AdminTable";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <>
      <div>
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
            <div>
              <ProfileCard data={user} />
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="admins">
            <div className={` `}>
              <button
                className="primaryButton py-2 px-3 mt-2"
                onClick={() => setModalOpened(true)}
              >
                create Sub admin
              </button>
              <CreateSubAdminModal
                modalOpened={modalOpened}
                setModalOpened={setModalOpened}
              />
              <AdminTable />
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </>
  );
};

export default Profile;
