import Styles from "../../../Styles/ModalStyle.module.css";
import { Modal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import CreateTempBill from "./CreateTempBill";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import RenterProfile from "../../renter/modals/RenterProfile";
import { billApi } from "../../../redux/features/transactions/RTK Query/billApi";

const RenterDropDown = ({
  renterDropDownModalOpened,
  setRenterDropDownModalOpened,
  popUpType,
  data,
}) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [renterData, setRenterData] = useState({});
  const [profileModalOpened, setProfileModalOpened] = useState(false);
  const [createTempBillModalOpened, setCreateTempBillModalOpened] =
    useState(false);
  const [renterId, setRenterId] = useState(null);
  const [selectedData, setSelectedData] = useState({
    renter: "",
  });

  //manually fetch renter temp bill data
  const { data: tempData = {}, isLoading } =
    billApi.endpoints.fetchRenterTemporaryBill.useQuery(renterId);

  const handleChange = (e) => {
    setSelectedData({ ...selectedData, [e.target.name]: e.target.value });
    setRenterId(JSON.parse(e.target.value)._id);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const renter = JSON.parse(selectedData.renter);
    setRenterData(renter);
    // setId(renter._id);
    if (popUpType === "tempBill") {
      if (!isLoading) {
        setCreateTempBillModalOpened(true);
        setRenterDropDownModalOpened(false);
        setRenterData(renter);
      }
    } else if (popUpType === "renterProfile") {
      setProfileModalOpened(true);
      setRenterDropDownModalOpened(false);
    }
  };

  return (
    <>
      {renterData && (
        <CreateTempBill
          createTempBillModalOpened={createTempBillModalOpened}
          setCreateTempBillModalOpened={setCreateTempBillModalOpened}
          renterData={renterData}
          temporaryData={tempData}
        />
      )}

      {renterData && (
        <RenterProfile
          profileModalOpened={profileModalOpened}
          setProfileModalOpened={setProfileModalOpened}
          data={renterData}
        />
      )}

      <Modal
        classNames={{
          modal: `bg-gray-300 dark:bg-gray-800`,
          title: `modal__title`,
          close: `modal__close`,
        }}
        overlayOpacity={0.55}
        overlayBlur={3}
        size={isMobile ? "sm" : "md"}
        opened={renterDropDownModalOpened}
        onClose={() => setRenterDropDownModalOpened(false)}
      >
        <div>
          <div className={`card ${Styles.Modal_header}`}>
            <h3 className={` ${Styles.Modal_header_title}`}>All Renters</h3>
            <span className={` ${Styles.Modal_header_subtitle}`}>
              * select only one renter from the dropdown
            </span>
          </div>

          {data ? (
            <form>
              <div className={`card px-4 py-3 `} style={{ marginTop: "10px" }}>
                <select
                  // style={{ width: "100%", marginBottom: "10px" }}
                  name="renter"
                  className=" w-full dark:bg-slate-800 dark:text-gray-400"
                  onChange={handleChange}
                  value={selectedData.renter}
                >
                  <option value="" hidden>
                    Select Renter
                  </option>
                  {data
                    ? data
                        .filter((item) => item.apartment !== null)
                        .map((newitem, index) =>
                          newitem.apartment.apartmentDetails
                            .apartment_number !== "" &&
                          newitem.apartment.apartmentDetails.roomNumber !==
                            "" ? (
                            <option key={index} value={JSON.stringify(newitem)}>
                              &#10687; Name&#9500; {newitem.fullname} &#10148;
                              Apartment:{" "}
                              {
                                newitem.apartment.apartmentDetails
                                  .apartment_number
                              }{" "}
                            </option>
                          ) : null
                        )
                    : null}
                </select>
              </div>

              <button
                className="submit_button mx-auto mt-5 px-3 py-1"
                disabled={isLoading}
                onClick={onSubmit}
              >
                {isLoading ? <LoadingSpinner /> : "submit"}
              </button>
            </form>
          ) : (
            <>
              <LoadingSpinner />
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default RenterDropDown;
