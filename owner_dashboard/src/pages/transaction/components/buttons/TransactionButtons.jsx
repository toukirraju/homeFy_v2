import Style from "../../styles/Transaction.module.css";
import dashStyle from "../../../dashboard/styles/Dashboard.module.css";
import { DatePicker } from "@mantine/dates";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { payableUsers } from "../../../../redux/slices/billSlice";

import LoadingSpinner from "../../../../Components/LoadingSpinner";
import { getAllrenters } from "../../../../redux/slices/renterSlice";
import PayableRenters from "../../modals/PayableRenters";
import RenterDropDown from "../../modals/RenterDropDown";
const TransactionButtons = () => {
  const dispatch = useDispatch();

  const { profileData } = useSelector((state) => state.owner);

  const { payableRenters } = useSelector((state) => state.billInfo);

  const [isMakeBillOpen, setIsMakeBillOpen] = useState(false);
  const [popUpType, setPopUpType] = useState("");
  const [payableModalOpened, setPayableModalOpened] = useState(false);
  const [renterDropDownModalOpened, setRenterDropDownModalOpened] =
    useState(false);
  const [renterData, setRenterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const handleMakeBillChange = (e) => {
    setIsMakeBillOpen(!isMakeBillOpen);
    setDate(e);
    // console.log(e);
    setLoading(true);
    dispatch(payableUsers({ month: e.getMonth() + 1, year: e.getFullYear() }))
      .unwrap()
      .then(() => {
        setLoading(false);
        setPayableModalOpened(true);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  const rentersPopUp = ({ popUpType }) => {
    setPopUpType(popUpType);
    setLoading(true);
    dispatch(getAllrenters())
      .unwrap()
      .then((res) => {
        setLoading(false);
        setRenterData(res.renters);
        setRenterDropDownModalOpened(true);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <>
      <div className={`card ${Style.btn__container}`}>
        <DatePicker
          style={{ display: "none" }}
          dropdownType="modal"
          variant="unstyled"
          firstDayOfWeek="sunday"
          dropdownOpened={isMakeBillOpen}
          setDropdownOpened={() => setIsMakeBillOpen(!isMakeBillOpen)}
          maxDate={new Date()}
          value={date}
          onChange={handleMakeBillChange}
        />
        {profileData.role === "owner" && (
          <button
            className="tempBill__button"
            onClick={() => rentersPopUp({ popUpType: "tempBill" })}
            disabled={loading || profileData.defaultHomeID === ""}
          >
            Temporary Bill
          </button>
        )}

        <button
          className={Style.makeBill__button}
          onClick={() => setIsMakeBillOpen(!isMakeBillOpen)}
          disabled={loading || profileData.defaultHomeID === ""}
        >
          Make Bill
        </button>
        <button
          className="button "
          onClick={() => rentersPopUp({ popUpType: "renterProfile" })}
          disabled={loading || profileData.defaultHomeID === ""}
        >
          Renter profile
        </button>
        <PayableRenters
          payableModalOpened={payableModalOpened}
          setPayableModalOpened={setPayableModalOpened}
          data={payableRenters}
          date={{ month, year }}
        />

        {renterData.length !== 0 && (
          <RenterDropDown
            renterDropDownModalOpened={renterDropDownModalOpened}
            setRenterDropDownModalOpened={setRenterDropDownModalOpened}
            data={renterData}
            popUpType={popUpType}
          />
        )}
      </div>

      {loading && (
        <div className={dashStyle.loading__screen}>
          <LoadingSpinner />
        </div>
      )}
    </>
  );
};

export default TransactionButtons;
