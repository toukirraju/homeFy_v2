import HousesLineChart from "./components/charts/HousesLineChart";
import VerifyHousePieChart from "./components/charts/VerifyHousePieChart";
import RegionalHouseBarChart from "./components/charts/RegionalHouseBarChart";
import HouseListTable from "./components/table/HouseListTable";
import { useState } from "react";
import { YearPickerInput } from "@mantine/dates";
import {
  useFetchCreatedHousesQuery,
  useFetchVerifiedHouseCountQuery,
} from "../../redux/features/house/houseApi";
import { Loader } from "@mantine/core";
import Error from "../../Components/Error";
import { useSelector } from "react-redux";

const House = () => {
  const [date, setDate] = useState(new Date());
  const getYearFromDate = (date) => {
    const year = new Date(date).getFullYear();
    return year;
  };
  const year = getYearFromDate(date);

  const error = useSelector((state) => state.error);

  const {
    data: yearlyCreatedHouses,
    isLoading: createdLoading,
    isError: createdError,
  } = useFetchCreatedHousesQuery({ year });

  //line chart
  let lineChart;

  if (createdLoading && !createdError) {
    lineChart = <Loader />;
  }

  if (!createdLoading && createdError && error) {
    lineChart = <Error message={error?.data?.message} />;
  }

  if (
    !createdLoading &&
    !createdError &&
    Object.keys(yearlyCreatedHouses).length > 0
  ) {
    lineChart = <HousesLineChart data={yearlyCreatedHouses} />;
  }

  return (
    <>
      <div className="card dark:bg-slate-800 dark:text-slate-400 flex flex-col  items-center max-h-[200px] ">
        <div className="w-full border-b-2 px-3 flex justify-between">
          <span className="text-sm mt-1 text-gray-600 dark:text-slate-400">
            Yearly created House
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

      <div className="md:grid grid-cols-7 gap-2 my-2">
        <div className="card md:col-span-2 w-full">
          <VerifyHousePieChart />
        </div>
        <div className="card md:col-span-5 w-full">
          <RegionalHouseBarChart year={year} />
        </div>
      </div>

      <div className="card">
        <HouseListTable />
      </div>
    </>
  );
};

export default House;
