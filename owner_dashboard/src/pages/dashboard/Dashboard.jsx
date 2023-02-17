import Style from "./styles/Dashboard.module.css";
import TransactionButtons from "../transaction/components/buttons/TransactionButtons";
import BarChartCompo from "./components/Charts/BarChartCompo";
import CircularProgress from "./components/Charts/CircularProgress";
import PieChart from "./components/Charts/PieChart";
import ApartmentWidget from "./components/widgets/ApartmentWidget";
import RenterWidget from "./components/widgets/RenterWidget";
import BillTable from "../transaction/components/tables/BillTable";
import { useDispatch, useSelector } from "react-redux";
import LogoSearch from "./components/logoSearch/LogoSearch";
import AlertPoPUP from "../../Components/AlertPoPUP";
import { useEffect, useState } from "react";
import {
  getApartmentWidget,
  getPieChartData,
  getRenterActivity,
  getYearlyBills,
} from "../../redux/slices/dashboardSlice";
import { monthlyBill } from "../../redux/slices/billSlice";
import { Box } from "@mantine/core";

const Dashboard = () => {
  const dispatch = useDispatch();
  const currentYear = new Date().getFullYear();

  const [date, setDate] = useState(new Date());
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const { profileData, houses, managers } = useSelector((state) => state.owner);
  // console.log(profileData);
  const { billData } = useSelector((state) => state.billInfo);
  const { yearlyBills, renterActivity, pieChartData, apartmentWidgets } =
    useSelector((state) => state.dashboardData);
  const { message } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(getYearlyBills(currentYear));
    dispatch(monthlyBill({ month, year }));
    dispatch(getRenterActivity());
    dispatch(getPieChartData());
    dispatch(getApartmentWidget());
  }, []);
  return (
    <>
      <Box
        sx={(theme) => ({
          // Media query with value from theme
          [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
            // height: 540,
            width: "calc(100vw - 20px)",
          },
        })}
      >
        {message && <AlertPoPUP message={message} />}
        <div className="card headerContainer">
          <h3 className="title">Dashboard</h3>
          <div className="bulkCreate">
            <LogoSearch />
          </div>
        </div>
        <div className="button_sections">
          <TransactionButtons />
        </div>
        <div className={Style.main__section}>
          <div>
            <BarChartCompo data={yearlyBills} />
          </div>
          <div className={` ${Style.circular_charts}`}>
            <div className={` ${Style.progress}`}>
              <CircularProgress data={renterActivity} />
            </div>
            <div className={` ${Style.progress}`}>
              <PieChart data={pieChartData} />
            </div>

            {/* Widgets */}
            <div>
              <ApartmentWidget data={apartmentWidgets} />
            </div>
            <div>
              <RenterWidget data={renterActivity} />
            </div>
          </div>
          <div className="table__sections">
            <BillTable data={billData} />
          </div>
        </div>
      </Box>
    </>
  );
};

export default Dashboard;
