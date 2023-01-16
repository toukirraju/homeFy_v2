import { useEffect, useState } from "react";
import RenterTable from "./components/tables/RenterTable";
import Style from "./styles/Renter.module.css";
import CreateRenter from "../../Components/modals/renterModal/CreateRenter";
import LogoSearch from "../../Components/logoSearch/LogoSearch";
import { useDispatch, useSelector } from "react-redux";
import { getAllrenters } from "../../redux/slices/renterSlice";
import RenterLineChart from "./components/charts/RenterLineChart";
import PieChart from "./components/charts/PieChart";
import RegionalBarChart from "./components/charts/RegionalBarChart";

const Renter = () => {
  const dispatch = useDispatch();
  const [modalOpened, setModalOpened] = useState(false);

  const { isReload } = useSelector((state) => state.reload);
  const { renterData } = useSelector((state) => state.renterInfo);
  useEffect(() => {
    const fetchRenterInfo = async () => {
      await dispatch(getAllrenters());
    };
    fetchRenterInfo();
  }, [dispatch, isReload]);
  return (
    <>
      <div className="card headerContainer ">
        <h3>Renters</h3>
        <LogoSearch searchType="renter" />
      </div>
      <div>1. Line chart for monthly created renters "for 1 year"</div>
      <div>2. pie chart for active/inactive renter</div>
      <div>3. regional renters bar chart</div>
      <div>
        4. all renters table "newly created show first " renter can be find by
        their username or home owner username/phone number
      </div>

      <div className={Style.body_wrapper}>
        <div className={Style.chart_container_1}>
          <RenterLineChart />
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
          <RenterTable data={renterData} />
        </div>
      </div>

      {/* <div className="button__section">
        <button onClick={() => setModalOpened(true)}>Add new</button>
        <CreateRenter
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
        />
      </div>
      <div className="">
        <RenterTable data={renterData} />
      </div> */}
    </>
  );
};

export default Renter;
