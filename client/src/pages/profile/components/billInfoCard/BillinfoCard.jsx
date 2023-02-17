import Style from "./BillinfoCard.module.css";

const BillinfoCard = () => {
  return (
    <div className={Style.apartment__wrapper}>
      <h4 className={Style.apartment__header}>Bill Information</h4>
      <div className="apartment__container">
        <div className={Style.double__content}>
          <div className="content">
            <span>Rent</span>
            <span>5000</span>
          </div>
          <div className="content">
            <span>Gas Bill</span>
            <span>500</span>
          </div>
        </div>

        <div className={Style.double__content}>
          <div className="content">
            <span>Water Bill</span>
            <span>101</span>
          </div>
          <div className="content">
            <span>Electricity Bill</span>
            <span>5464</span>
          </div>
        </div>

        <div className={Style.double__content}>
          <div className="content">
            <span>Service Charge</span>
            <span>1</span>
          </div>
          <div className="content">
            <span>Others</span>
            <span>4</span>
          </div>
        </div>

        <div className={Style.double__content}>
          <div className="content">
            <span>Total Rent</span>
            <span>16756</span>
          </div>
          <div className="content">
            <span>Due</span>
            <span>5667</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillinfoCard;
