import React from "react";
import { useSelector } from "react-redux";
import FollowersCard from "../followersCard/FollowersCard";
import HomeInfoCard from "../homeInfoCard/HomeInfoCard";
import InfoCard from "../infoCard/InfoCard";

const ProfileLeft = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="card ProfileSide">
      <InfoCard />
      {user?.user.role === "owner" && <HomeInfoCard />}
      {/* <FollowersCard /> */}
    </div>
  );
};

export default ProfileLeft;
