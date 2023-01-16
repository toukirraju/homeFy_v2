import Style from "./style/widgets.module.css";
import {
  UilBuilding,
  UilBedDouble,
  UilTimesCircle,
  UilCheckCircle,
} from "@iconscout/react-unicons";
const ApartmentWidget = () => {
  return (
    <>
      <div className={Style.widget__wrapper}>
        <div className={Style.widget__header}>
          <h4>Apartments</h4>
        </div>
        <div className={Style.widget__innerCard}>
          <div className={Style.widget__card__content}>
            <span>
              <UilBuilding />
            </span>
            <span>Total apartments</span>
            <span>30</span>
          </div>
        </div>
        <div className={Style.widget__innerCard}>
          <div className={Style.widget__card__content}>
            <span>
              <UilBedDouble />
            </span>
            <span>Total Rooms</span>
            <span>30</span>
          </div>
        </div>
        <div className={Style.widget__innerCard}>
          <div className={Style.widget__card__content}>
            <span>
              <UilCheckCircle />
            </span>
            <span>Available Rooms</span>
            <span>30</span>
          </div>
        </div>
        <div className={Style.widget__innerCard}>
          <div className={Style.widget__card__content}>
            <span>
              <UilTimesCircle />
            </span>
            <span>Unavailable Rooms</span>
            <span>30</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApartmentWidget;
