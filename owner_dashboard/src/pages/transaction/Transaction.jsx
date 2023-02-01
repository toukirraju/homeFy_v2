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

  useEffect(() => {}, [billData, temporaryData]);

  return (
    <>
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
