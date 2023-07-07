import React, { useState } from "react";
import Profle from "../../../../assets/userlogo.png";
import { UilPen } from "@iconscout/react-unicons";
import ProfileUpdateModal from "../../modals/ProfileUpdateModal";

const ProfileCard = ({ data }) => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div
      className={`card relative flex flex-col md:flex-row justify-start items-center p-5 text-gray-600 dark:text-gray-400`}
    >
      {/* image section  */}
      <div className={` flex justify-center items-center flex-col gap-3`}>
        <img
          src={Profle}
          alt=""
          className="h-48 w-h-48 rounded-full ring-4 shadow-lg  ring-gray-400 dark:shadow-gray-950 shadow-blue-950"
        />
        <input type="file" />
      </div>

      {/* content section */}
      <div className={`flex flex-col gap-4 p-6`}>
        <div>
          <span className="font-semibold mr-3 capitalize">Name:</span>
          {data.firstname} {data.lastname}
        </div>
        <div>
          {" "}
          <span className="font-semibold mr-3 capitalize">Phone:</span>
          {data.phone}
        </div>
        <div>
          <span className="font-semibold mr-3 capitalize">Nid:</span>
          {data.nid}
        </div>
        <div>
          <span className="font-semibold mr-3 capitalize">Profession:</span>
          {data.profession}
        </div>
        <div>
          <span className="font-semibold mr-3 capitalize">Role:</span>

          <span>"{data.role.name}"</span>
        </div>
      </div>

      {/* edit button  */}
      <div className={` absolute top-4 right-4 `}>
        <UilPen
          width="2rem"
          height="1.2rem"
          cursor="pointer"
          onClick={() => setModalOpened(true)}
        />
        <ProfileUpdateModal
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
          data={data}
        />
      </div>
    </div>
  );
};

export default ProfileCard;
