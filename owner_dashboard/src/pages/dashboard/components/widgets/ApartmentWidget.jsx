import Style from "./style/widgets.module.css";
import {
  UilBuilding,
  UilBedDouble,
  UilBed,
  UilCheckCircle,
} from "@iconscout/react-unicons";
const ApartmentWidget = ({ data }) => {
  return (
    <>
      {/* <div className={Style.widget__wrapper}> */}
      <div className={Style.widget__header}>
        <h4>Apartments</h4>
      </div>
      <div className={Style.widget__container}>
        <div className={Style.widget__innerCard}>
          <div className={Style.widget__card__content}>
            <span>
              <UilBuilding />
            </span>
            <span>Total Apartments</span>
            <span>{data.totalApartment}</span>
          </div>
        </div>
        <div className={Style.widget__innerCard}>
          <div className={Style.widget__card__content}>
            <span>
              <UilCheckCircle />
            </span>
            <span>Available apartments</span>
            <span>{data.availableApartments}</span>
          </div>
        </div>
        <div className={Style.widget__innerCard}>
          <div className={Style.widget__card__content}>
            <span>
              <UilBedDouble />
            </span>
            <span>Family apartments</span>
            <span>{data.familyApartment}</span>
          </div>
        </div>
        <div className={Style.widget__innerCard}>
          <div className={Style.widget__card__content}>
            <span>
              <UilBed />
            </span>
            <span>Bachelor apartments</span>
            <span>{data.bachelorApartment}</span>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default ApartmentWidget;
