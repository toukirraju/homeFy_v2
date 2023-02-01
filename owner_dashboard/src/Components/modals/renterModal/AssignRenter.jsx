import { Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { useEffect, useState } from "react";

import Styles from "../../../Styles/ModalStyle.module.css";

import { useDispatch, useSelector } from "react-redux";
import ApartmentService from "../../../redux/services/apartment.api.service";

import { assign } from "../../../redux/slices/assignRenterSlice";
import { setReload } from "../../../redux/slices/reloadSlice";

import LoadingSpinner from "../../LoadingSpinner";
import { toast } from "react-toastify";

const AssignRenter = ({
  assignModalOpened,
  setAssignModalOpened,
  renterData,
  searchPopUp,
}) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [allApartments, setAllApartments] = useState([]);
  const [selectedData, setSelectedData] = useState({
    apartment: "",
    renter: "",
  });
  const { user } = useSelector((state) => state.auth.user);

  const handleChange = (e) => {
    setSelectedData({ ...selectedData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let apartment = JSON.parse(selectedData.apartment);
    let renter = searchPopUp ? null : JSON.parse(selectedData.renter);

    const assignedData = {
      ownerId: user._id,
      apartmentId: apartment._id,
      apartment_number: apartment.apartmentDetails.apartment_number,
      roomNumber: apartment.apartmentDetails.roomNumber,
      renterName: searchPopUp
        ? renterData.firstname + " " + renterData.lastname
        : renter.firstname + " " + renter.lastname,
      renterId: searchPopUp ? renterData._id : renter._id,
    };
    // console.log(assignedData);
    dispatch(assign(assignedData))
      .unwrap()
      .then(() => {
        setLoading(false);
        dispatch(setReload());
        toast.success("successfully assigned");
        setAssignModalOpened(false);
        setSelectedData({
          apartment: "",
          renter: "",
        });
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const fetchApartments = async () => {
      const data = await ApartmentService.getApartments();
      // setPersons(data);
      setAllApartments(data);
    };
    fetchApartments();
  }, [assignModalOpened]);

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
          <span className={Styles.Modal_header_subtitle}>
            * assign the renter to his apartment
          </span>
        </div>
        <form>
          <div className={Styles.input__container}>
            <select
              className=""
              onChange={handleChange}
              value={selectedData.apartment}
              name="apartment"
            >
              <option value="">Select Apartment</option>

              {allApartments
                ? allApartments.map((apartments) =>
                    apartments.map((apartment, idx) =>
                      apartment.isAvailable === true ? (
                        <option key={idx} value={JSON.stringify(apartment)}>
                          Floor:- {apartment.apartmentDetails.floor} &#10148;
                          Apartment:-{" "}
                          {apartment.apartmentDetails.apartment_number} &#10148;
                          Room:- {apartment.apartmentDetails.roomNumber}
                        </option>
                      ) : null
                    )
                  )
                : null}
            </select>

            {!searchPopUp && (
              <select
                name="renter"
                className=""
                onChange={handleChange}
                value={selectedData.renter}
              >
                <option value="">Select Renter</option>
                {renterData
                  ? renterData.map((item, index) =>
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
