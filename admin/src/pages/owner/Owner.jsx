import { YearPickerInput } from "@mantine/dates";
import { useState } from "react";
import { useSelector } from "react-redux";
import OwnerListTable from "./components/table/OwnerListTable";
import { useFetchOwnersChartsQuery } from "../../redux/features/owner/ownerApi";
import { Loader } from "@mantine/core";
import Error from "../../Components/Error";
import OwnerLineChart from "./components/charts/OwnerLineChart";
import WidgetSm from "../../Components/cards/WidgetSm";

const Owner = () => {
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
  } = useFetchOwnersChartsQuery({ year });

  //line chart
  let lineChart, widgets;

  if (isLoading && !isError) {
    lineChart = <Loader />;
  }

  if (!isLoading && isError && error) {
    lineChart = <Error message={error?.data?.message} />;
  }

  if (!isLoading && !isError && Object.keys(yearlyData).length > 0) {
    lineChart = (
      <OwnerLineChart yrlyCreatedOwner={yearlyData.yearlyCreatedOwner} />
    );
    widgets = (
      <div className="md:grid grid-cols-10 gap-2 my-2">
        <div className="card md:col-span-2 w-full">
          {/* <PieChart blokedData={yearlyData} /> */}
          <WidgetSm
            leftIcon={"icon"}
            rightIcon={null}
            title={"Total Owner"}
            value={yearlyData.ownersCount}
          />
        </div>
        <div className="card md:col-span-2 w-full">
          <WidgetSm
            leftIcon={"icon"}
            rightIcon={null}
            title={"Premium Owner"}
            value={yearlyData.premiumOwner}
          />
        </div>
        <div className="card md:col-span-2 w-full">
          <WidgetSm
            leftIcon={"icon"}
            rightIcon={null}
            title={"Total Manager"}
            value={yearlyData.managersCount}
          />
        </div>
        <div className="card md:col-span-2 w-full">
          <WidgetSm
            leftIcon={"icon"}
            rightIcon={null}
            title={"Blocked"}
            value={yearlyData.blockedOwnerCount}
          />
        </div>
        <div className="card md:col-span-2 w-full">
          <WidgetSm
            leftIcon={"icon"}
            rightIcon={null}
            title={"Unblocked"}
            value={yearlyData.notBlockedOwnerCount}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="card dark:bg-slate-800 dark:text-slate-400 flex flex-col  items-center max-h-[200px] ">
        <div className="w-full border-b-2 px-3 flex justify-between">
          <span className="text-sm mt-1 text-gray-600 dark:text-slate-400">
            Yearly created Owners
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

      {widgets}

      <div className="card">
        <OwnerListTable />
      </div>
    </>
  );
};

export default Owner;
