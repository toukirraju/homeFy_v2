import RenterLineChart from "./components/charts/RenterLineChart";
import { useState } from "react";
import { useSelector } from "react-redux";
import { YearPickerInput } from "@mantine/dates";
import RenterListTable from "./components/tables/RenterListTable";
import { useFetchRenterChartsQuery } from "../../redux/features/renter/renterApi";
import { Loader } from "@mantine/core";
import Error from "../../Components/Error";

const Renter = () => {
  const [date, setDate] = useState(new Date());
  const getYearFromDate = (date) => {
    const year = new Date(date).getFullYear();
    return year;
  };
  const year = getYearFromDate(date);

  return (
    <>
      <div className="card dark:bg-slate-800 dark:text-slate-400 flex flex-col  items-center max-h-[200px] ">
        <div className="w-full border-b-2 px-3 flex justify-between">
          <span className="text-sm mt-1 text-gray-600 dark:text-slate-400">
            Yearly created Renters
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
        <div className="w-full">
          <RenterLineChart year={year} />
        </div>
      </div>

      <div className="card">
        <RenterListTable />
      </div>
    </>
  );
};

export default Renter;
