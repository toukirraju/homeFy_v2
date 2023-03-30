import styles from "./style/Apartment.module.css";
import CreateBulkApartment from "./modals/CreateBulkApartment";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allApartments } from "../../redux/slices/apartmentSlice";
import { v4 as uuidv4 } from "uuid";
import AlertPoPUP from "../../Components/AlertPoPUP";
import { clearMessage } from "../../redux/slices/message";
import ApartmentTableNew from "./components/tables/ApartmentTableNew";
import { Loader } from "@mantine/core";
import DefaultHouseGuideline from "../../Components/UI/guidlines/DefaultHouseGuideline";
import CreateApartmentGuideline from "../../Components/UI/guidlines/CreateApartmentGuideline";

const Apartment = () => {
  const dispatch = useDispatch();
  const [modalOpened, setModalOpened] = useState(false);

  const { isReload } = useSelector((state) => state.reload);
  const { message } = useSelector((state) => state.message);
  const { apartmentData, loading } = useSelector(
    (state) => state.apartmentInfo
  );
  const { profileData } = useSelector((state) => state.owner);

  useEffect(() => {
    const fetchApartmentInfo = async () => {
      await dispatch(allApartments())
        .unwrap()
        .then(() => dispatch(clearMessage()));
    };
    fetchApartmentInfo();
  }, [isReload]);

  let content = null;

  if (loading)
    content = (
      <div className="loading__screen">
        <Loader color="cyan" variant="bars" />
      </div>
    );

  if (apartmentData?.length === 0) {
    content = <CreateApartmentGuideline />;
  }

  if (profileData.defaultHomeID === "") {
    content = <DefaultHouseGuideline />;
  }

  if (apartmentData?.length > 0) {
    content = <ApartmentTableNew data={apartmentData} />;
  }
  return (
    <>
      {message && <AlertPoPUP message={message} />}
      <div className="card headerContainer" style={{ marginBottom: "10px" }}>
        <h3>Apartments</h3>
        {profileData.role === "owner" && (
          <div className="bulkCreate">
            <button
              disabled={profileData.defaultHomeID === ""}
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
        )}
      </div>

      <div>
        <Fragment key={uuidv4()}>
          {/* {apartmentData.length !== 0 ? (
            <ApartmentTableNew data={apartmentData} />
          ) : (
            <div className="loading__screen">
              <Loader color="cyan" variant="bars" />
            </div>
          )} */}
          {content}
        </Fragment>
      </div>
    </>
  );
};

export default Apartment;
