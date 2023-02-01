import Styles from "../../../Styles/ModalStyle.module.css";
import { Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CreateTempBill from "./CreateTempBill";
import { renterTemporaryBill } from "../../../redux/slices/billSlice";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const RenterDropDown = ({
  renterDropDownModalOpened,
  setRenterDropDownModalOpened,
  data,
}) => {
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [renterData, setRenterData] = useState({});
  const [tempData, setTempData] = useState({});
  const [createTempBillModalOpened, setCreateTempBillModalOpened] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedData, setSelectedData] = useState({
    renter: "",
  });

  const handleChange = (e) => {
    setSelectedData({ ...selectedData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const renter = JSON.parse(selectedData.renter);
    setRenterData(renter);
    setLoading(true);
    dispatch(renterTemporaryBill(renter._id))
      .unwrap()
      .then((bill) => {
        setLoading(false);
        setCreateTempBillModalOpened(true);
        setRenterDropDownModalOpened(false);
        setRenterData(renter);
        setTempData(bill.renterTempBill);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <>
      <CreateTempBill
        createTempBillModalOpened={createTempBillModalOpened}
        setCreateTempBillModalOpened={setCreateTempBillModalOpened}
        renterData={renterData}
        temporaryData={tempData}
      />
      <Modal
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
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
              <div
                className={`card ${Styles.input__container}`}
                style={{ marginTop: "10px" }}
              >
                <select
                  style={{ width: "100%", marginBottom: "10px" }}
                  name="renter"
                  className=""
                  onChange={handleChange}
                  value={selectedData.renter}
                >
                  <option value="">Select Renter</option>
                  {data
                    ? data
                        .filter((item) => item.apartment !== null)
                        .map((newitem, index) =>
                          newitem.apartment.apartmentDetails
                            .apartment_number !== "" &&
                          newitem.apartment.apartmentDetails.roomNumber !==
                            "" ? (
                            <option key={index} value={JSON.stringify(newitem)}>
                              {newitem.firstname} {newitem.lastname}
                              &#10148; Apartment:{" "}
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
                className={Styles.submit_button}
                disabled={loading}
                onClick={onSubmit}
              >
                {loading ? <LoadingSpinner /> : "submit"}
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
