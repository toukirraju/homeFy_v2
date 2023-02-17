import Style from "./ApartmentInfoCard.module.css";

const ApartmentInfoCard = () => {
  return (
    <div className={Style.apartment__wrapper}>
      <h4 className={Style.apartment__header}>Apartment Information</h4>
      <div className="apartment__container">
        <div className={Style.double__content}>
          <div className="content">
            <span>Apartment Name</span>
            <span>A-1</span>
          </div>
          <div className="content">
            <span>Apartment Type</span>
            <span>Family</span>
          </div>
        </div>

        <div className={Style.double__content}>
          <div className="content">
            <span>Apartment Number</span>
            <span>101</span>
          </div>
          <div className="content">
            <span>Room Number</span>
            <span>R-101</span>
          </div>
        </div>

        <div className={Style.double__content}>
          <div className="content">
            <span>Floor</span>
            <span>1</span>
          </div>
          <div className="content">
            <span>Bed Room</span>
            <span>4</span>
          </div>
        </div>

        <div className={Style.double__content}>
          <div className="content">
            <span>Kitchen</span>
            <span>1</span>
          </div>
          <div className="content">
            <span>Baths</span>
            <span>2</span>
          </div>
        </div>

        <div className={Style.double__content}>
          <div className="content">
            <span>Balcony</span>
            <span>2</span>
          </div>
          <div className="content">
            <span>Apartment Length</span>
            <span>1200 sqft</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentInfoCard;
