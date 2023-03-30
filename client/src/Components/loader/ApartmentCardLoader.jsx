import Style from "../../pages/profile/components/apartmentInfoCard/ApartmentInfoCard.module.css";
const ApartmentCardLoader = () => {
  return (
    <div className={Style.apartment__wrapper}>
      <h4 className={Style.apartment__header}>Apartment Information</h4>

      <div className="apartment__container">
        <div className={Style.double__content}>
          <div className="content">
            <span>Apartment Name</span>
            <span
              style={{ height: "10px", width: "80%" }}
              className={Style.skeleton}
            ></span>
          </div>
          <div className="content">
            <span>Apartment Type</span>

            <span
              style={{ height: "10px", width: "70%" }}
              className={Style.skeleton}
            ></span>
          </div>
        </div>

        <div className={Style.double__content}>
          <div className="content">
            <span>Apartment Number</span>
            <span
              style={{ height: "12px", width: "90%" }}
              className={Style.skeleton}
            ></span>
          </div>
          <div className="content">
            <span>Room Number</span>
            <span
              style={{ height: "12px", width: "67%" }}
              className={Style.skeleton}
            ></span>
          </div>
        </div>

        <div className={Style.double__content}>
          <div className="content">
            <span>Floor</span>
            <span
              style={{ height: "12px", width: "35%" }}
              className={Style.skeleton}
            ></span>
          </div>
          <div className="content">
            <span>Bed Room</span>
            <span
              style={{ height: "12px", width: "55%" }}
              className={Style.skeleton}
            ></span>
          </div>
        </div>

        <div className={Style.double__content}>
          <div className="content">
            <span>Kitchen</span>
            <span
              style={{ height: "12px", width: "45%" }}
              className={Style.skeleton}
            ></span>
          </div>
          <div className="content">
            <span>Baths</span>
            <span
              style={{ height: "12px", width: "35%" }}
              className={Style.skeleton}
            ></span>
          </div>
        </div>

        <div className={Style.double__content}>
          <div className="content">
            <span>Balcony</span>
            <span
              style={{ height: "12px", width: "45%" }}
              className={Style.skeleton}
            ></span>
          </div>
          <div className="content">
            <span>Apartment Length</span>
            <span
              style={{ height: "12px", width: "85%" }}
              className={Style.skeleton}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentCardLoader;
