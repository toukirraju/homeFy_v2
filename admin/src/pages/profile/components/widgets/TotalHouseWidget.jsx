import Style from "./style/widgets.module.css";
import {
  UilBuilding,
  UilBedDouble,
  UilTimesCircle,
  UilCheckCircle,
} from "@iconscout/react-unicons";
const TotalHouseWidget = () => {
  return (
    <>
      <div className={Style.widget__wrapper}>
        <div className={Style.widget__header}>
          <h4>Total houses</h4>
        </div>
        <div className={Style.widget__container}>
          <div className={Style.widget__innerCard}>
            <div className={Style.widget__card__content}>
              <span>
                <UilBuilding />
              </span>
              <span>Total House</span>
              <span>50k+</span>
            </div>
          </div>
          <div className={Style.widget__innerCard}>
            <div className={Style.widget__card__content}>
              <span>
                <UilBedDouble />
              </span>
              <span>Verified</span>
              <span>30K+</span>
            </div>
          </div>
          <div className={Style.widget__innerCard}>
            <div className={Style.widget__card__content}>
              <span>
                <UilCheckCircle />
              </span>
              <span>Unverified</span>
              <span>20K</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalHouseWidget;
