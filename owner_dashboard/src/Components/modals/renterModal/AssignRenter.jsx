import { Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useSelector } from "react-redux";

import Styles from "../../../Styles/ModalStyle.module.css";

import LoadingSpinner from "../../LoadingSpinner";
import useAssign from "./hooks/useAssign";

const AssignRenter = ({
  assignModalOpened,
  setAssignModalOpened,
  renterData,
  renterPopUp,
  apartmentData,
  apartmentPopUp,
}) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const { renters } = useSelector((state) => state.renterInfo);

  //custom useAssign hook
  const { loading, fatchApartments, selectedData, handleChange, onSubmit } =
    useAssign({
      apartmentData,
      apartmentPopUp,
      renterData,
      renterPopUp,
      setAssignModalOpened,
    });

  return (
    <>
      <Modal
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        size={isMobile ? "sm" : "md"}
        // fullScreen={isMobile}
        opened={assignModalOpened}
        onClose={() => setAssignModalOpened(false)}
      >
        <div className={Styles.Modal_header}>
          <h3 className={Styles.Modal_header_title}>Assign Renter</h3>
          {fatchApartments?.length === 0 && (
            <span className={Styles.Modal_header_subtitle}>
              * Apartment not available
            </span>
          )}
        </div>
        <form>
          <div className={Styles.input__container}>
            {!apartmentPopUp && (
              <select
                className=""
                onChange={handleChange}
                value={selectedData.apartment}
                name="apartment"
              >
                <option value="">Select Apartment</option>

                {fatchApartments
                  ? fatchApartments.map(
                      (apartment, idx) =>
                        // console.log(apartments)
                        // apartments.map((apartment, idx) =>
                        apartment.isAvailable === true ? (
                          <option key={idx} value={JSON.stringify(apartment)}>
                            Floor:- {apartment.apartmentDetails.floor} &#10148;
                            Apartment:-{" "}
                            {apartment.apartmentDetails.apartment_number}{" "}
                            &#10148; Room:-{" "}
                            {apartment.apartmentDetails.roomNumber}
                          </option>
                        ) : null
                      // )
                    )
                  : null}
              </select>
            )}

            {!renterPopUp && (
              <select
                name="renter"
                className=""
                onChange={handleChange}
                value={selectedData.renter}
              >
                <option value="">Select Renter</option>
                {renters
                  ? renters.map((item, index) =>
                      (item.apartment_number === "" ||
                        item.apartment_number === undefined) &&
                      (item.roomNumber === "" ||
                        item.roomNumber === undefined) ? (
                        <option key={index} value={JSON.stringify(item)}>
                          &#10687; Name&#9500; {item.username} &#9500;&#9742;
                          Phone:- {item.phone}
                        </option>
                      ) : null
                    )
                  : null}
              </select>
            )}
          </div>

          <button
            className={Styles.submit_button}
            disabled={loading}
            onClick={onSubmit}
          >
            {loading ? <LoadingSpinner /> : " Assign"}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default AssignRenter;
