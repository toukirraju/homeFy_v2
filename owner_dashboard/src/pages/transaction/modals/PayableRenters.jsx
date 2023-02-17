import Styles from "../../../Styles/ModalStyle.module.css";
import { Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { renterTemporaryBill } from "../../../redux/slices/billSlice";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import CreateBill from "./CreateBill";

const PayableRenters = ({
  payableModalOpened,
  setPayableModalOpened,
  data,
  date,
}) => {
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [tempData, setTempData] = useState({});
  const [renterData, setRenterData] = useState({});
  const [billModalOpened, setBillModalOpened] = useState(false);
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
    // console.log(renter._id);
    setLoading(true);
    dispatch(renterTemporaryBill(renter._id))
      .unwrap()
      .then((bill) => {
        setLoading(false);
        setPayableModalOpened(false);
        setBillModalOpened(true);
        setRenterData({ ...renter, ...date });
        setTempData(bill.renterTempBill);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <>
      {Object.keys(renterData).length !== 0 && (
        <CreateBill
          billModalOpened={billModalOpened}
          setBillModalOpened={setBillModalOpened}
          data={renterData}
          temporaryBill={tempData}
        />
      )}

      <Modal
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        size={isMobile ? "sm" : "md"}
        opened={payableModalOpened}
        onClose={() => setPayableModalOpened(false)}
      >
        <div>
          <div className={`card ${Styles.Modal_header}`}>
            <h3 className={` ${Styles.Modal_header_title}`}>Payable Renters</h3>
            <span className={` ${Styles.Modal_header_subtitle}`}>
              * select the renter to create bill.
            </span>
          </div>

          {data ? (
            <form>
              <div
                className={`card ${Styles.input__container}`}
                style={{ marginTop: "10px" }}
              >
                <select
                  name="renter"
                  className=""
                  onChange={handleChange}
                  value={selectedData.renter}
                >
                  <option value="">Select Renter</option>
                  {data
                    ? data
                        .filter((filterdItem) => filterdItem.apartment !== null)
                        .sort(
                          (a, b) =>
                            a.apartment.apartmentDetails.floor -
                            b.apartment.apartmentDetails.floor
                        )
                        .map((item, index) =>
                          item.apartment.apartmentDetails.apartment_number !==
                            "" &&
                          item.apartment.apartmentDetails.roomNumber !== "" ? (
                            <option key={index} value={JSON.stringify(item)}>
                              Floor: {item.apartment.apartmentDetails.floor}{" "}
                              &#10148; {item.apartment.renterName}
                              &#10148; Apartment:{" "}
                              {
                                item.apartment.apartmentDetails.apartment_number
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

export default PayableRenters;
