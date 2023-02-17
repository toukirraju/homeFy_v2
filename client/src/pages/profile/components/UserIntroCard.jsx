import Style from "../styles/Profile.module.css";
import {
  UilPhoneAlt,
  UilMapMarker,
  UilEnvelope,
  UilPostcard,
  UilEstate,
  UilChatBubbleUser,
  UilEdit,
} from "@iconscout/react-unicons";
import image from "../../../assets/user.png";

const UserIntroCard = () => {
  return (
    <div className={Style.user__profile__section}>
      <div className={Style.upper__section}>
        <div className={Style.profile__image__section}>
          <img src={image} alt="" />
        </div>
        <div className={Style.intro__section}>
          <h3 className={Style.intro__title}>MR. ALi</h3>
          <div className={Style.info__content}>
            <span>
              <UilPhoneAlt />
            </span>
            <span>+880123785435</span>
          </div>
          <div className={Style.info__content}>
            <span>
              <UilMapMarker />
            </span>
            <span>241/1, Laxmipura, Joydebpur, Gazipur 1700</span>
          </div>
          <div className={Style.double__info}>
            <div className={Style.info__content}>
              <span>
                <UilEnvelope />
              </span>
              <span>user@gmail.com</span>
            </div>
            <div className={Style.info__content}>
              <span>
                <UilPostcard />
              </span>
              <span>Nid:45987879362876</span>
            </div>
          </div>
        </div>
      </div>
      <div className={Style.edit__button}>
        <UilEdit />
      </div>
      <div className={Style.bottom__section}>
        {" "}
        <div className="house__info">
          <h4 className={Style.bottom__section__heading}>House Details</h4>
          <div className={Style.house__title}>
            <span>
              <UilEstate />
            </span>
            <span>Chayanir</span>
          </div>
          <div className={Style.house__container}>
            <div className={Style.info__content}>
              <span>
                <UilMapMarker />
              </span>
              <span>241/1, Laxmipura, Joydebpur, Gazipur 1700</span>
            </div>
            <div className={Style.double__info}>
              <div className={Style.info__content}>
                <span>
                  <UilChatBubbleUser />
                </span>
                <span>house owner</span>
              </div>
              <div className={Style.info__content}>
                <span>
                  <UilPhoneAlt />
                </span>
                <span>+880137987326</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserIntroCard;
