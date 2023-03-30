import Style from "../styles/Profile.module.css";
import {
  UilPhoneAlt,
  UilMapMarker,
  UilAt,
  UilPostcard,
  UilEstate,
  UilChatBubbleUser,
  UilEdit,
} from "@iconscout/react-unicons";
import image from "../../../assets/user.png";
import UpdateProfile from "../modals/updateProfile/UpdateProfile";
import { useState } from "react";

const UserIntroCard = ({ data }) => {
  const [updateModalOpened, setUpdateModalOpened] = useState(false);
  const handleUpdate = () => {
    setUpdateModalOpened(true);
  };
  return (
    <div className={Style.user__profile__section}>
      <div className={Style.upper__section}>
        <div className={Style.profile__image__section}>
          <img src={image} alt="" />
        </div>
        <div className={Style.intro__section}>
          <h3 className={Style.intro__title}>{data.fullname}</h3>
          <div className={Style.info__content}>
            <div className={Style.info__content__title}>
              <span>
                <UilPhoneAlt />
              </span>
              <span>Phone: </span>
            </div>

            <span>+880 {data.phone}</span>
          </div>
          <div className={Style.info__content}>
            <div className={Style.info__content__title}>
              <span>
                <UilMapMarker />
              </span>
              <span>Permanent address: </span>
            </div>
            <span>{data.permanent_address}</span>
          </div>
          <div className={Style.double__info}>
            <div className={Style.info__content}>
              <div className={Style.info__content__title}>
                <span>
                  <UilAt />
                </span>
                <span>E-mail: </span>
              </div>

              <span>{data.username}</span>
            </div>
            <div className={Style.info__content}>
              <div className={Style.info__content__title}>
                <span>
                  <UilPostcard />
                </span>
                <span>NID number: </span>
              </div>

              <span>{data.NID_no}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={Style.edit__button} onClick={handleUpdate}>
        <UilEdit />
      </div>
      <UpdateProfile
        updateModalOpened={updateModalOpened}
        setUpdateModalOpened={setUpdateModalOpened}
        data={data}
      />
      <div className={Style.bottom__section}>
        {" "}
        {data.house !== null && (
          <div className="house__info">
            <h4 className={Style.bottom__section__heading}>House Details</h4>
            <div className={Style.house__title}>
              <span>
                <UilEstate />
              </span>
              <span>{data?.house?.houseName}</span>
            </div>
            <div className={Style.house__container}>
              <div className={Style.info__content}>
                <div className={Style.info__content__title}>
                  <span>
                    <UilMapMarker />
                  </span>
                  <span>Present address: </span>
                </div>
                <span>{data?.houseAddress?.address_display_name}</span>
              </div>
              <div className={Style.double__info}>
                <div className={Style.info__content}>
                  <div className={Style.info__content__title}>
                    <span>
                      <UilChatBubbleUser />
                    </span>
                    <span>Owner name: </span>
                  </div>
                  <span>{data?.house?.ownerName}</span>
                </div>
                <div className={Style.info__content}>
                  <div className={Style.info__content__title}>
                    <span>
                      <UilPhoneAlt />
                    </span>
                    <span>Owner phone number: </span>
                  </div>

                  <a href={`tel:+880${data?.house?.ownerPhone}`}>
                    {data?.house?.ownerPhone}
                  </a>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                fontWeight: 900,
              }}
              className={Style.intro__footer}
            >
              <div>
                <span>Advance Pay:</span>
                <span> {data?.advanceRent ? data?.advanceRent : 0}</span>
              </div>
              <div>
                <span>Assigned: </span>
                <span>
                  {new Date(data?.assignedDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserIntroCard;
