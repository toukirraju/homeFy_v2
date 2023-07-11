import ApartLineChart from "./components/charts/ApartLineChart";
import CustomTable from "../../Components/tables/CustomTable";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Loader } from "@mantine/core";
import Error from "../../Components/Error";
import { YearPickerInput } from "@mantine/dates";
import { useFetchApartmentChartsQuery } from "../../redux/features/apartment/apartmentApi";
import ApartmentListTable from "./components/tables/ApartmentListTable";

const Apartment = () => {
  const [date, setDate] = useState(new Date());
  const getYearFromDate = (date) => {
    const year = new Date(date).getFullYear();
    return year;
  };
  const year = getYearFromDate(date);

  const error = useSelector((state) => state.error);

  const {
    data: yearlyData,
    isLoading,
    isError,
  } = useFetchApartmentChartsQuery({ year });

  //line chart
  let lineChart;

  if (isLoading && !isError) {
    lineChart = <Loader />;
  }

  if (!isLoading && isError && error) {
    lineChart = <Error message={error?.data?.message} />;
  }

  if (!isLoading && !isError && Object.keys(yearlyData).length > 0) {
    lineChart = <ApartLineChart yearlyData={yearlyData} />;
  }
  return (
    <div className="w-full">
      <div className="card dark:bg-slate-800 dark:text-slate-400 flex flex-col  items-center max-h-[200px] ">
        <div className="w-full border-b-2 px-3 flex justify-between">
          <span className="text-sm mt-1 text-gray-600 dark:text-slate-400">
            Yearly created Apartments
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

      {/* Table  */}
      <div className="card my-3">
        <ApartmentListTable />
      </div>
    </div>
  );
};

export default Apartment;
