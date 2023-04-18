import Styles from "../../../Styles/ModalStyle.module.css";
import { Modal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import CreateBill from "./CreateBill";
import { billApi } from "../../../redux/features/transactions/RTK Query/billApi";
import { monthIsBeforeOrOn25th } from "../../../utility/customFunctions";
import GenerateDue from "../components/GenerateDue";
import { useSelector } from "react-redux";

const PayableRenters = ({
  payableModalOpened,
  setPayableModalOpened,
  data,
  date,
  fullDate,
}) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [renterId, setRenterId] = useState(null);
  const [tempData, setTempData] = useState({});
  const [renterData, setRenterData] = useState({});
  const [billModalOpened, setBillModalOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedData, setSelectedData] = useState({
    renter: "",
  });

  const { user } = useSelector((state) => state.auth);

  //manually fetch renter temp bill data
  const { refetch: refetchTempBill } =
    billApi.endpoints.fetchRenterTemporaryBill.useQuery(renterId);

  const handleChange = (e) => {
    setSelectedData({ ...selectedData, [e.target.name]: e.target.value });
    setRenterId(JSON.parse(e.target.value)._id);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const renter = JSON.parse(selectedData.renter);
    setLoading(true);
    refetchTempBill(renter._id)
      .unwrap()
      .then((bill) => {
        setLoading(false);
        setPayableModalOpened(false);
        setBillModalOpened(true);
        setRenterData({ ...renter, ...date });
        setTempData(bill);
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
        overlayOpacity={0.55}
        overlayBlur={3}
        size={isMobile ? "sm" : "md"}
        opened={payableModalOpened}
        onClose={() => setPayableModalOpened(false)}
        classNames={{
          modal: `bg-gray-300 dark:bg-gray-800`,
          title: `modal__title`,
          close: `modal__close`,
        }}
      >
        <div>
          <div className={`card ${Styles.Modal_header} mb-2`}>
            <h3 className=" my-3 text-2xl font-bold text-gray-400 drop-shadow-sm">
              Payable Renters
            </h3>

            {/************************ Generating Due bills start ************************/}

            {data.length !== 0 &&
              !monthIsBeforeOrOn25th(fullDate) &&
              user.role === "owner" && (
                <GenerateDue
                  fullDate={fullDate}
                  setPayableModalOpened={setPayableModalOpened}
                />
              )}
            {/************************ Generating Due bills end ************************/}
          </div>

          {/************************ select payable renter from here  *************************/}
          {data ? (
            <form>
              <div className={`card ${Styles.input__container}  `}>
                <span className="px-2 text-base text-zinc-400">
                  {data.length === 0
                    ? "All Payment complete"
                    : "Select renter for creating bill."}
                </span>
                <select
                  name="renter"
                  className=" dark:bg-slate-800 dark:text-gray-200"
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
                className="submit_button mx-auto mt-5 px-3 py-1"
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
