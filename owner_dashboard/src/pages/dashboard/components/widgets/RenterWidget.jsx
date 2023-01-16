import Style from "./style/widgets.module.css";
import {
  UilBuilding,
  UilBedDouble,
  UilTimesCircle,
  UilCheckCircle,
} from "@iconscout/react-unicons";
const RenterWidget = () => {
  return (
    <>
      <div className={Style.widget__wrapper}>
        <div className={Style.widget__header}>
          <h4>Renters</h4>
        </div>
        <div className={Style.widget__container}>
          <div className={Style.widget__innerCard}>
            <div className={Style.widget__card__content}>
              <span>
                <UilBuilding />
              </span>
              <span>Total Renter</span>
              <span>30</span>
            </div>
          </div>
          <div className={Style.widget__innerCard}>
            <div className={Style.widget__card__content}>
              <span>
                <UilBedDouble />
              </span>
              <span>Active renter</span>
              <span>30</span>
            </div>
          </div>
          <div className={Style.widget__innerCard}>
            <div className={Style.widget__card__content}>
              <span>
                <UilCheckCircle />
              </span>
              <span>Inactive renter</span>
              <span>30</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RenterWidget;
