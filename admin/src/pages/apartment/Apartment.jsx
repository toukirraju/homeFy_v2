import styles from "./style/Apartment.module.css";
import ApartmentTable from "./components/tables/ApartmentTable";
import CreateBulkApartment from "./modals/CreateBulkApartment";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allApartments } from "../../redux/slices/apartmentSlice";
import { v4 as uuidv4 } from "uuid";
import ApartLineChart from "./components/charts/ApartLineChart";

const Apartment = () => {
  const dispatch = useDispatch();
  const [modalOpened, setModalOpened] = useState(false);

  const { isReload } = useSelector((state) => state.reload);
  const { apartmentData } = useSelector((state) => state.apartmentInfo);
  useEffect(() => {
    const fetchApartmentInfo = async () => {
      await dispatch(allApartments());
    };
    fetchApartmentInfo();
  }, [dispatch, isReload]);

  const [floorData, setFloorData] = useState([]);
  function handlefloorChange(event) {
    setFloorData((data) => JSON.parse(event.target.value));
  }
  const floors = apartmentData.map((item, index) => (
    <option key={index} value={JSON.stringify(item)}>
      {item[0].level}
    </option>
  ));
  return (
    <>
      <div className="card headerContainer" style={{ marginBottom: "10px" }}>
        <h3>Apartments</h3>
        <div className="bulkCreate">
          <button
            className={`button ${styles.create__btn}`}
            onClick={() => setModalOpened(true)}
          >
            Create
          </button>
          <CreateBulkApartment
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
          />
        </div>
      </div>

      <div>
        <>1. All Apartments Line chart 2. Recent created apartment list table</>
        <ApartLineChart />

        {/* <div className={`${styles.input__container}`}>
          <label htmlFor="floor" className={styles.input__label}>
            Select floor number:{" "}
          </label>
          <select
            name="floor"
            value={floorData.floors}
            onChange={handlefloorChange}
          >
            <option value={JSON.stringify(new Array())}>----select----</option>
            {floors}
          </select>
        </div> */}
        <h3 className="title">Recent created apartment list</h3>
        <Fragment key={uuidv4()}>
          <ApartmentTable data={floorData} />
        </Fragment>
      </div>
    </>
  );
};

export default Apartment;
