import Styles from "./PostStyle.module.css";
import {
  UilHouseUser,
  UilPhoneAlt,
  UilMapMarker,
  UilEllipsisH,
} from "@iconscout/react-unicons";

const PostWidget = ({ data }) => {
  return (
    <div>
      <div className={`card ${Styles.Post__widget__wrapper}`}>
        <div className={`card ${Styles.Post__widget__header}`}>
          <h3 className={`${Styles.header__title}`}>{data.houseName}</h3>
          <span className={`${Styles.header__subtitle}`}>
            <UilMapMarker />{" "}
            {`${data.houseNo}, ${data.area},${data.city},${data.postCode}`}
          </span>
          <div className={`${Styles.owner__container__body}`}>
            <div className={`${Styles.owner_content}`}>
              <span>
                <UilHouseUser />
              </span>
              <span>{data.ownerName}</span>
            </div>
            <div className={`${Styles.owner_content}`}>
              <span>
                <UilPhoneAlt />{" "}
              </span>
              <span>{data.ownerPhone}</span>
            </div>
          </div>
        </div>
        <div className={`card ${Styles.Post__widget__container}`}>
          <div className={`card ${Styles.Post__count}`}>
            <span>Total Post:</span>
            <span>{data.totalPost}</span>
          </div>
          <div className={`card ${Styles.Post__activity}`}>
            <div className={`${Styles.active__post}`}>
              <span>Active Post: </span>
              <span>{data.activePost}</span>
            </div>
            <div className={`${Styles.inactive__post}`}>
              <span>inactive Post: </span>
              <span>{data.inactivePost}</span>
            </div>
          </div>
          {/* <div className={`card ${Styles.Post__dropdown}`}>
            <select name="posts" id="">
              <option value="">Posts</option>
              <option value="">Post 1</option>
              <option value="">Post 2</option>
            </select>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PostWidget;
