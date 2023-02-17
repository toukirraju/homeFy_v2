import { useEffect, useState } from "react";
import RenterTable from "./components/tables/RenterTable";
import "./styles/Renter.css";
import CreateRenter from "./modals/CreateRenter";
import { useDispatch, useSelector } from "react-redux";
import { getAllrenters } from "../../redux/slices/renterSlice";
import SearchRenter from "./components/renterSearch/SearchRenter";
import AlertPoPUP from "../../Components/AlertPoPUP";
import { clearMessage } from "../../redux/slices/message";
import RenterTableNew from "./components/tables/RenterTableNew";
import { Loader } from "@mantine/core";

const Renter = () => {
  const dispatch = useDispatch();
  const [modalOpened, setModalOpened] = useState(false);

  const { isReload } = useSelector((state) => state.reload);
  const { message } = useSelector((state) => state.message);
  const { renters } = useSelector((state) => state.renterInfo);
  const { profileData } = useSelector((state) => state.owner);
  // console.log(profileData.role);

  useEffect(() => {
    const fetchRenterInfo = async () => {
      await dispatch(getAllrenters()).then(() => dispatch(clearMessage()));
    };
    fetchRenterInfo();
  }, [dispatch, isReload]);

  return (
    <>
      {/* <AlertPoPUP /> */}
      {message && <AlertPoPUP message={message} />}

      <div className="card headerContainer ">
        <h3>Renters</h3>
        <SearchRenter />
      </div>
      <div className="button__section">
        {profileData.role === "owner" && (
          <>
            <button onClick={() => setModalOpened(true)}>Add new</button>
            <CreateRenter
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
            />
          </>
        )}
      </div>
      <div style={{ marginTop: "10px" }}>
        {" "}
        {/* <RenterTable data={renters} />{" "} */}
        {renters.length !== 0 ? (
          <RenterTableNew data={renters} />
        ) : (
          <div className="loading__screen">
            <Loader color="cyan" variant="bars" />
          </div>
        )}
        {/* <RenterTableNew /> */}
      </div>
    </>
  );
};

export default Renter;
