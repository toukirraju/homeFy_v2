import styles from "./style/Apartment.module.css";
import ApartmentTable from "./components/tables/ApartmentTable";
import CreateBulkApartment from "./modals/CreateBulkApartment";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allApartments } from "../../redux/slices/apartmentSlice";
import { v4 as uuidv4 } from "uuid";

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
        <div className={`${styles.input__container}`}>
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
        </div>
        <Fragment key={uuidv4()}>
          <ApartmentTable data={floorData} />
        </Fragment>
        {/* {apartmentData ? (
          groupByApartments(apartmentData, "level").map((item) => (
            <>
              <ApartmentTable data={item} />
            </>
          ))
        ) : (
          <>wait...</>
        )} */}
        {/* {apartmentData ? (
          apartmentData.map((item) => (
            <Fragment key={uuidv4()}>
              <ApartmentTable data={item} />
            </Fragment>
          ))
        ) : (
          <>wait...</>
        )} */}
      </div>
    </>
  );
};

export default Apartment;
