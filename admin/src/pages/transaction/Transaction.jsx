import BillLineChart from "./components/charts/BillLineChart";
import PaidAmountBarChart from "./components/charts/PaidAmountBarChart";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Loader } from "@mantine/core";
import { useFetchYearlyBillCountQuery } from "../../redux/features/bills/billApi";
import Error from "../../Components/Error";
import { YearPickerInput } from "@mantine/dates";
import BillListTable from "./components/tables/BillListTable";
import TemporaryBillListTable from "./components/tables/TemporaryBillListTable";

const Transaction = () => {
  const [date, setDate] = useState(new Date());
  const getYearFromDate = (date) => {
    const year = new Date(date).getFullYear();
    return year;
  };
  const year = getYearFromDate(date);

  const error = useSelector((state) => state.error);

  const {
    data: yearlyBillCount,
    isLoading,
    isError,
  } = useFetchYearlyBillCountQuery({ year });

  //line chart
  let lineChart;

  if (isLoading && !isError) {
    lineChart = <Loader />;
  }

  if (!isLoading && isError && error) {
    lineChart = <Error message={error?.data?.message} />;
  }

  if (!isLoading && !isError && Object.keys(yearlyBillCount).length > 0) {
    lineChart = <BillLineChart yearlyBillCount={yearlyBillCount} />;
  }

  return (
    <>
      <div className="card dark:bg-slate-800 dark:text-slate-400 flex flex-col  items-center max-h-[200px] ">
        <div className="w-full border-b-2 px-3 flex justify-between">
          <span className="text-sm mt-1 text-gray-600 dark:text-slate-400">
            Yearly created Bills
          </span>
          <span>
            <YearPickerInput
              dropdownType="modal"
              placeholder="Pick date"
              value={date}
              onChange={setDate}
              mx="auto"
              maw={400}
            />
          </span>
        </div>
        <div className="w-full">{lineChart}</div>
      </div>

      <div className="card my-2 w-full">
        <PaidAmountBarChart year={year} />
      </div>

      <div className="card">
        <BillListTable />
      </div>

      <div className="card my-2">
        <TemporaryBillListTable />
      </div>
    </>
  );
};

export default Transaction;
