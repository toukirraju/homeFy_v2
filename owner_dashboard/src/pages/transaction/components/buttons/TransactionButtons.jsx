import Style from "../../styles/Transaction.module.css";
import dashStyle from "../../../dashboard/styles/Dashboard.module.css";
import { DatePicker } from "@mantine/dates";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { payableUsers } from "../../../../redux/slices/billSlice";

import LoadingSpinner from "../../../../Components/LoadingSpinner";
import { getAllrenters } from "../../../../redux/slices/renterSlice";
import PayableRenters from "../../modals/PayableRenters";
import RenterDropDown from "../../modals/RenterDropDown";
const TransactionButtons = () => {
  const dispatch = useDispatch();
  const { payableRenters } = useSelector((state) => state.billInfo);
  const [isMakeBillOpen, setIsMakeBillOpen] = useState(false);
  const [isTempBillOpen, setIsTempBillOpen] = useState(false);
  const [payableModalOpened, setPayableModalOpened] = useState(false);
  const [renterDropDownModalOpened, setRenterDropDownModalOpened] =
    useState(false);
  const [renterData, setRenterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const handleMakeBillChange = (e) => {
    setIsMakeBillOpen(!isMakeBillOpen);
    setDate(e);
    setLoading(true);
    dispatch(payableUsers({ month, year }))
      .unwrap()
      .then(() => {
        setLoading(false);
        setPayableModalOpened(true);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const rentersPopUp = () => {
    setLoading(true);
    dispatch(getAllrenters())
      .unwrap()
      .then((res) => {
        setLoading(false);
        setRenterData(res.renters);
        setRenterDropDownModalOpened(true);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <>
      <div className={`card ${Style.btn__container}`}>
        <DatePicker
          style={{ display: "none" }}
          dropdownType="modal"
          variant="unstyled"
          firstDayOfWeek="sunday"
          dropdownOpened={isMakeBillOpen}
          setDropdownOpened={() => setIsMakeBillOpen(!isMakeBillOpen)}
          maxDate={new Date()}
          value={date}
          onChange={handleMakeBillChange}
        />
        <button
          className="tempBill__button"
          onClick={() => rentersPopUp()}
          disabled={loading}
        >
          Temporary Bill
        </button>
        <button
          className={Style.makeBill__button}
          onClick={() => setIsMakeBillOpen(!isMakeBillOpen)}
          disabled={loading}
        >
          Make Bill
        </button>
        <button
          className="button "
          onClick={() => setIsTempBillOpen(!isTempBillOpen)}
        >
          Renter profile
        </button>
        <PayableRenters
          payableModalOpened={payableModalOpened}
          setPayableModalOpened={setPayableModalOpened}
          data={payableRenters}
        />

        {renterData.length !== 0 && (
          <RenterDropDown
            renterDropDownModalOpened={renterDropDownModalOpened}
            setRenterDropDownModalOpened={setRenterDropDownModalOpened}
            data={renterData}
          />
        )}
      </div>

      {loading && (
        <div className={dashStyle.loading__screen}>
          <LoadingSpinner />
        </div>
      )}
    </>
  );
};

export default TransactionButtons;
