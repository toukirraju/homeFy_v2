import LeftStyle from "./Left__side.module.css";

import {
  UilSearch,
  UilScenery,
  UilPlayCircle,
  UilLocationPoint,
  UilSchedule,
} from "@iconscout/react-unicons";
import MapModal from "./MapModal";
import { useState } from "react";
const PostSearchBar = () => {
  const [isMapOn, setIsMapOn] = useState(false);
  return (
    <>
      <div className={`card ${LeftStyle.search__wrapper}`}>
        <div className={LeftStyle.Search_container}>
          <input
            type="text"
            placeholder="#Explore"
            // onChange={(e) => setSearchId(e.target.value)}
          />
          <div className={LeftStyle.s__icon}>
            <UilSearch />
          </div>
        </div>
        <div className={LeftStyle.postOptions}>
          <div className={LeftStyle.option} style={{ color: "var(--photo)" }}>
            <UilScenery />
            Photo
          </div>
          <div className={LeftStyle.option} style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>
          <div
            className={LeftStyle.option}
            style={{ color: "var(--location)" }}
            onClick={() => setIsMapOn((prev) => !prev)}
          >
            <UilLocationPoint />
            Location
          </div>
          <div className={LeftStyle.option} style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Schedule
          </div>
        </div>
      </div>
      {isMapOn && <MapModal />}
    </>
  );
};

export default PostSearchBar;
