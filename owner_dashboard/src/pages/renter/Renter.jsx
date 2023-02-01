import { useEffect, useState } from "react";
import RenterTable from "./components/tables/RenterTable";
import "./styles/Renter.css";
import CreateRenter from "./modals/CreateRenter";
import { useDispatch, useSelector } from "react-redux";
import { getAllrenters } from "../../redux/slices/renterSlice";
import SearchRenter from "./components/renterSearch/SearchRenter";

const Renter = () => {
  const dispatch = useDispatch();
  const [modalOpened, setModalOpened] = useState(false);

  const { isReload } = useSelector((state) => state.reload);
  const { renters } = useSelector((state) => state.renterInfo);
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
        <SearchRenter />
      </div>
      <div className="button__section">
        <button onClick={() => setModalOpened(true)}>Add new</button>
        <CreateRenter
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
        />
      </div>
      <div className="">
        <RenterTable data={renters} />
      </div>
    </>
  );
};

export default Renter;
