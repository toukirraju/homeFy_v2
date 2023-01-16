import BillTable from "./components/tables/BillTable";
import TempBillTable from "./components/tables/TempBillTable";
import Style from "./styles/Transaction.module.css";
import { DatePicker } from "@mantine/dates";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { monthlyBill, temporaryBill } from "../../redux/slices/billSlice";

import TransactionButtons from "./components/buttons/TransactionButtons";
import BillLineChart from "./components/charts/BillLineChart";
import PieChart from "./components/charts/PieChart";
import RegionalBarChart from "./components/charts/RegionalBarChart";

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

      <div>1. Line chart for monthly created Transactions "for 1 year"</div>
      <div>2. transactions widgets "total paid..."</div>
      <div>3. regional transactions bar chart</div>
      <div>
        4. all transactions table "newly created show first " bill can be find
        by renter username or home owner username/phone number
      </div>
      <div>
        5. all temporary bill table log "newly created show first " bill can be
        find by renter username or home owner username/phone number
      </div>

      <div className={Style.body_wrapper}>
        <div className={Style.chart_container_1}>
          <BillLineChart />
        </div>
        <div className={Style.chart_container_2}>
          <div className={Style.pieChart_container}>
            <PieChart />
          </div>
          <div className={Style.barChart_container}>
            <RegionalBarChart />
          </div>
        </div>
        <div className={Style.table_container}>
          <div className={` ${Style.bills__container}`}>
            <div className={Style.billTable}>
              <BillTable data={billData} />
            </div>
            <div className={Style.tempTable}>
              <TempBillTable data={temporaryData} />
            </div>
          </div>
        </div>
      </div>

      {/* <TransactionButtons />
      <div className={` ${Style.bills__container}`}>
        <div className={Style.billTable}>
          <BillTable data={billData} />
        </div>
        <div className={Style.tempTable}>
          <TempBillTable data={temporaryData} />
        </div>
      </div> */}
    </>
  );
};

export default Transaction;
