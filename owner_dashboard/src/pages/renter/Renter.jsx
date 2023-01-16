import { useEffect, useState } from "react";
import RenterTable from "./components/tables/RenterTable";
import "./styles/Renter.css";
import CreateRenter from "../../Components/modals/renterModal/CreateRenter";
import LogoSearch from "../../Components/logoSearch/LogoSearch";
import { useDispatch, useSelector } from "react-redux";
import { getAllrenters } from "../../redux/slices/renterSlice";

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
      <div className="button__section">
        <button onClick={() => setModalOpened(true)}>Add new</button>
        <CreateRenter
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
        />
      </div>
      <div className="">
        <RenterTable data={renterData} />
      </div>
    </>
  );
};

export default Renter;
