import Style from "./ApartmentInfoCard.module.css";

const ApartmentInfoCard = ({ data }) => {
  return (
    <div className={`card ${Style.apartment__wrapper}`}>
      <h4 className={Style.apartment__header}>Apartment Information</h4>
      {data === null ? (
        <h4>No apartment have been assigned</h4>
      ) : (
        <div className="apartment__container">
          <div className={Style.double__content}>
            <div className="content">
              <span>Apartment Name</span>
              <span>{data.apartmentDetails.apartmentName}</span>
            </div>
            <div className="content">
              <span>Apartment Type</span>
              <span>{data.apartmentDetails.apartmentType}</span>
            </div>
          </div>

          <div className={Style.double__content}>
            <div className="content">
              <span>Apartment Number</span>
              <span>{data.apartmentDetails.apartment_number}</span>
            </div>
            <div className="content">
              <span>Room Number</span>
              <span>{data.apartmentDetails.roomNumber}</span>
            </div>
          </div>

          <div className={Style.double__content}>
            <div className="content">
              <span>Floor</span>
              <span>{data.apartmentDetails.floor}</span>
            </div>
            <div className="content">
              <span>Bed Room</span>
              <span>{data.apartmentDetails.number_of_bed_room}</span>
            </div>
          </div>

          <div className={Style.double__content}>
            <div className="content">
              <span>Kitchen</span>
              <span>{data.apartmentDetails.number_of_kitchen}</span>
            </div>
            <div className="content">
              <span>Baths</span>
              <span>{data.apartmentDetails.number_of_baths}</span>
            </div>
          </div>

          <div className={Style.double__content}>
            <div className="content">
              <span>Balcony</span>
              <span>{data.apartmentDetails.number_of_balcony}</span>
            </div>
            <div className="content">
              <span>Apartment Length</span>
              <span>{data.apartmentDetails.apartment_length} sqft</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApartmentInfoCard;
