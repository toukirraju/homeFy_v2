import BillTable from "./components/tables/BillTable";
import TempBillTable from "./components/tables/TempBillTable";
import Style from "./styles/Transaction.module.css";
import { DatePicker } from "@mantine/dates";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { monthlyBill, temporaryBill } from "../../redux/slices/billSlice";

import TransactionButtons from "./components/buttons/TransactionButtons";

const Transaction = () => {
  const dispatch = useDispatch();
  const { billData, temporaryData } = useSelector((state) => state.billInfo);
  const { isReload } = useSelector((state) => state.reload);

  const [date, setDate] = useState(new Date());
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const handleDateChange = (value) => {
    setDate(value);
  };

  useEffect(() => {
    dispatch(monthlyBill({ month, year }));
    dispatch(temporaryBill());
  }, [date, isReload, dispatch]);

  return (
    <>
      {/* <PayableRenters
        payableModalOpened={payableModalOpened}
        setPayableModalOpened={setPayableModalOpened}
        data={payableRenters}
      />
      <RenterDropDown
        renterDropDownModalOpened={renterDropDownModalOpened}
        setRenterDropDownModalOpened={setRenterDropDownModalOpened}
        data={renterData}
      /> */}
      <div className="card headerContainer">
        <h3 className="title">Transaction</h3>
        <div className="bulkCreate">
          <DatePicker
            className={Style.makeBill__button}
            defaultValue={new Date()}
            placeholder="Pick date"
            dropdownType="modal"
            // withinPortal
            variant="unstyled"
            size="xs"
            inputFormat={"MMMM-YYYY"}
            clearable={false}
            value={date}
            onChange={(value) => handleDateChange(value)}
          />
        </div>
      </div>
      {/* <div className={`card ${Style.btn__container}`}>
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
          {loading ? <LoadingSpinner /> : "Temporary Bill"}
        </button>
        <button
          className={Style.makeBill__button}
          onClick={() => setIsMakeBillOpen(!isMakeBillOpen)}
        >
          Make Bill
        </button>
        <button
          className="button "
          onClick={() => setIsTempBillOpen(!isTempBillOpen)}
        >
          Renter profile
        </button>
      </div> */}
      <TransactionButtons />
      <div className={` ${Style.bills__container}`}>
        <div className={Style.billTable}>
          <BillTable data={billData} />
        </div>
        <div className={Style.tempTable}>
          <TempBillTable data={temporaryData} />
        </div>
      </div>
    </>
  );
};

export default Transaction;
