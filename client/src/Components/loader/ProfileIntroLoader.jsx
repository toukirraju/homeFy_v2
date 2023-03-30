import Style from "../../pages/profile/styles/Profile.module.css";
import {
  UilPhoneAlt,
  UilMapMarker,
  UilAt,
  UilPostcard,
  UilEdit,
} from "@iconscout/react-unicons";
import image from "../../assets/user.png";

const ProfileIntroLoader = () => {
  return (
    <div className={Style.user__profile__section}>
      <div className={Style.upper__section}>
        <div className={Style.profile__image__section}>
          <img src={image} alt="" />
        </div>
        <div className={Style.intro__section}>
          <h3 className={Style.intro__title}></h3>
          <div className={Style.info__content}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderBottom: "2px solid lightgray",
                color: "black",
              }}
            >
              <span>
                <UilPhoneAlt />
              </span>
              <span>Phone: </span>
            </div>

            <span
              style={{ height: "10px", width: "80%" }}
              className={Style.skeleton}
            ></span>
          </div>
          <div className={Style.info__content}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderBottom: "2px solid lightgray",
                color: "black",
              }}
            >
              <span>
                <UilMapMarker />
              </span>
              <span>Permanent address: </span>
            </div>
            <span
              style={{ height: "10px", width: "80%" }}
              className={Style.skeleton}
            ></span>
          </div>
          <div className={Style.double__info}>
            <div className={Style.info__content}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "2px solid lightgray",
                  color: "black",
                }}
              >
                <span>
                  <UilAt />
                </span>
                <span>E-mail: </span>
              </div>

              <span
                style={{ height: "10px", width: "80%" }}
                className={Style.skeleton}
              ></span>
            </div>
            <div className={Style.info__content}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "2px solid lightgray",
                  color: "black",
                }}
              >
                <span>
                  <UilPostcard />
                </span>
                <span>NID number: </span>
              </div>

              <span
                style={{ height: "10px", width: "68%" }}
                className={Style.skeleton}
              ></span>
            </div>
          </div>
        </div>
      </div>
      <div className={Style.edit__button}>
        <UilEdit />
      </div>
      <div className={Style.bottom__section}></div>
    </div>
  );
};

export default ProfileIntroLoader;
