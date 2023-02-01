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

  const [floorData, setFloorData] = useState([]);
  const { isReload } = useSelector((state) => state.reload);
  const { apartmentData, isPending } = useSelector(
    (state) => state.apartmentInfo
  );

  useEffect(() => {
    const fetchApartmentInfo = async () => {
      await dispatch(allApartments()).unwrap();
    };
    fetchApartmentInfo();
  }, [isReload]);

  // function handlefloorChange(event) {
  //   setFloorData((data) => JSON.parse(event.target.value));
  // }

  // //floor selected data
  // const floors = apartmentData.map((item, index) => (
  //   <option key={index} value={JSON.stringify(item)}>
  //     {item[0].apartmentDetails.floor}
  //   </option>
  // ));
  // useEffect(() => {}, [isPending]);

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
        {/* <div className={`${styles.input__container}`}>
          <label htmlFor="floor" className={styles.input__label}>
            Select floor number:{" "}
          </label>
          <select
            name="floor"
            // value={floorData.floors}
            onChange={handlefloorChange}
          >
            <option value={JSON.stringify(new Array())}>----select----</option>
            {floors}
          </select>
        </div> */}
        <Fragment key={uuidv4()}>
          <ApartmentTable data={apartmentData} />
        </Fragment>
      </div>
    </>
  );
};

export default Apartment;
