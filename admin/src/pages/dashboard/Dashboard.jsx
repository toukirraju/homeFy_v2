import { useSelector } from "react-redux";
import WidgetCardlg from "../../Components/cards/WidgetCardlg";
import WidgetCardmd from "../../Components/cards/WidgetCardmd";
import WidgetSm from "../../Components/cards/WidgetSm";
import { pieChartData, smallWidgetData } from "../../dummyData";
import { useFetchDashboardWidgetsQuery } from "../../redux/features/dashboard/dashboardApi";
import { Loader } from "@mantine/core";
import Error from "../../Components/Error";
import RegionalHouseBarChart from "../house/components/charts/RegionalHouseBarChart";
import OwnerLineChart from "../owner/components/charts/OwnerLineChart";
import RenterLineChart from "../renter/components/charts/RenterLineChart";
import PaidAmountBarChart from "../transaction/components/charts/PaidAmountBarChart";
import VerifyHousePieChart from "../house/components/charts/VerifyHousePieChart";
import PieChart from "./components/Charts/PieChart";

const Dashboard = () => {
  const error = useSelector((state) => state.error);

  const {
    data: widgetsData,
    isLoading: widgetLoading,
    isError: widgetError,
  } = useFetchDashboardWidgetsQuery();

  const {
    apartmentCount,
    blockedOwnerCount,
    blockedRenterCount,
    houseCount,
    ownersCount,
    postCount,
    premiumOwner,
    renterCount,
  } = widgetsData || {};
  //line chart
  let widgets;

  if (widgetLoading && !widgetError) {
    widgets = <Loader />;
  }

  if (!widgetLoading && widgetError && error) {
    widgets = <Error message={error?.data?.message} />;
  }

  if (!widgetLoading && !widgetError && Object.keys(widgetsData).length > 0) {
    widgets = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-2">
        {/* cards */}
        <WidgetSm
          leftIcon={""}
          rightIcon={""}
          title={"Owners"}
          value={ownersCount}
        />
        <WidgetSm
          leftIcon={""}
          rightIcon={""}
          title={"Renters"}
          value={renterCount}
        />
        <WidgetSm
          leftIcon={""}
          rightIcon={""}
          title={"Houses"}
          value={houseCount}
        />
        <WidgetSm
          leftIcon={""}
          rightIcon={""}
          title={"Apartments"}
          value={apartmentCount}
        />

        <WidgetSm
          leftIcon={""}
          rightIcon={""}
          title={"Premium User"}
          value={premiumOwner}
        />
        <WidgetSm
          leftIcon={""}
          rightIcon={""}
          title={"Posts"}
          value={postCount}
        />
        <WidgetSm
          leftIcon={""}
          rightIcon={""}
          title={"Blocked Owner"}
          value={blockedOwnerCount}
        />
        <WidgetSm
          leftIcon={""}
          rightIcon={""}
          title={"Blocked Renter"}
          value={blockedRenterCount}
        />
      </div>
    );
  }
  return (
    <div className="w-full">
      {widgets}

      <div className="flex flex-col md:flex-row gap-2 w-full">
        {/* pie/donat/progress charts */}
        <div className="flex flex-col gap-2">
          {/* pie 1 */}
          <WidgetCardmd title={"House Status"}>
            <VerifyHousePieChart />
          </WidgetCardmd>
          <WidgetCardmd title={"Owner Package"}>
            <PieChart
              labels={["Basic", "Premium"]}
              data={[ownersCount, premiumOwner]}
            />
          </WidgetCardmd>
        </div>
        {/* bar/line charts */}
        <div className="bar grid grid-cols-1 lg:grid-cols-2  w-full gap-2 ">
          <WidgetCardlg title={"Regional Houses"}>
            <RegionalHouseBarChart />{" "}
          </WidgetCardlg>
          <WidgetCardlg title={"Owners"}>
            <OwnerLineChart />{" "}
          </WidgetCardlg>
          <WidgetCardlg title={"Renters"}>
            <RenterLineChart />{" "}
          </WidgetCardlg>
          <WidgetCardlg title={"Paid Amount"}>
            <PaidAmountBarChart />{" "}
          </WidgetCardlg>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
