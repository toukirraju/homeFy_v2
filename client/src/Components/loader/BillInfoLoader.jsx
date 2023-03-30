import Style from "../../pages/profile/components/apartmentInfoCard/ApartmentInfoCard.module.css";
const BillInfoLoader = () => {
  return (
    <div className={Style.apartment__wrapper}>
      <h4 className={Style.apartment__header}>Bill Information</h4>

      <div className="apartment__container">
        <div className={Style.double__content}>
          <div className="content">
            <span>Rent</span>
            <span
              style={{ height: "10px", width: "80%" }}
              className={Style.skeleton}
            ></span>
          </div>
          <div className="content">
            <span>Gas Bill</span>
            <span
              style={{ height: "10px", width: "80%" }}
              className={Style.skeleton}
            ></span>
          </div>
        </div>

        <div className={Style.double__content}>
          <div className="content">
            <span>Water Bill</span>
            <span
              style={{ height: "10px", width: "80%" }}
              className={Style.skeleton}
            ></span>
          </div>
          <div className="content">
            <span>Service Charge</span>
            <span
              style={{ height: "10px", width: "80%" }}
              className={Style.skeleton}
            ></span>
          </div>
        </div>

        <div className={Style.double__content}>
          <div className="content">
            <span>Others</span>
            <span
              style={{ height: "10px", width: "80%" }}
              className={Style.skeleton}
            ></span>
          </div>
          <div className="content">
            <span>Total Rent</span>
            <span
              style={{ height: "10px", width: "80%" }}
              className={Style.skeleton}
            ></span>
          </div>
        </div>

        <div className={Style.double__content}>
          <div className="content">
            <span>Electricity Bill</span>
            <span
              style={{ height: "10px", width: "80%" }}
              className={Style.skeleton}
            ></span>
          </div>

          <div className="content">
            <span>Due</span>
            <span
              style={{ height: "10px", width: "80%" }}
              className={Style.skeleton}
            ></span>
          </div>
        </div>

        <div className={Style.double__content}>
          <div className="content">
            <span> Others Temporary</span>
            <span
              style={{ height: "10px", width: "80%" }}
              className={Style.skeleton}
            ></span>
          </div>
          <div className="content">
            <span>Payable Rent</span>
            <span
              style={{ height: "10px", width: "80%" }}
              className={Style.skeleton}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillInfoLoader;
