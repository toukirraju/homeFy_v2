import Style from "./styles/Dashboard.module.css";
import LogoSearch from "../../Components/logoSearch/LogoSearch";
import TransactionButtons from "../transaction/components/buttons/TransactionButtons";
import BarChartCompo from "./components/Charts/BarChartCompo";
import CircularProgress from "./components/Charts/CircularProgress";
import PieChart from "./components/Charts/PieChart";
import ApartmentWidget from "./components/widgets/ApartmentWidget";
import RenterWidget from "./components/widgets/RenterWidget";
import BillTable from "../transaction/components/tables/BillTable";
import { useSelector } from "react-redux";
import TempBillTable from "../transaction/components/tables/TempBillTable";

const Dashboard = () => {
  const { billData, temporaryData } = useSelector((state) => state.billInfo);
  return (
    <>
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
          <BarChartCompo />
        </div>
        <div className={` ${Style.circular_charts}`}>
          <div className={` ${Style.progress}`}>
            <CircularProgress />
          </div>
          <div className={` ${Style.progress}`}>
            <PieChart />
          </div>

          {/* Widgets */}
          <div>
            <ApartmentWidget />
          </div>
          <div>
            <RenterWidget />
          </div>
        </div>
        <div className="table__sections">
          <BillTable data={billData} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
