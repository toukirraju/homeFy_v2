import { Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { renterTemporaryBill } from "../../../redux/slices/billSlice";
import LoadingSpinner from "../../LoadingSpinner";
import CreateBill from "./CreateBill";

const PayableRenters = ({
  payableModalOpened,
  setPayableModalOpened,
  data,
}) => {
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [tempData, setTempData] = useState({});
  const [renterData, setRenterData] = useState({});
  const [billModalOpened, setBillModalOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedData, setSelectedData] = useState({
    renter: "",
  });

  const handleChange = (e) => {
    setSelectedData({ ...selectedData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const renter = JSON.parse(selectedData.renter);
    // console.log(renter.renterId);
    setLoading(true);
    dispatch(renterTemporaryBill(renter.renterId))
      .unwrap()
      .then((bill) => {
        setLoading(false);
        setPayableModalOpened(false);
        setBillModalOpened(true);
        setRenterData(renter);
        setTempData(bill.renterTempBill);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <>
      <CreateBill
        billModalOpened={billModalOpened}
        setBillModalOpened={setBillModalOpened}
        data={renterData}
        temporaryBill={tempData}
      />
      <Modal
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        size={isMobile ? "sm" : "md"}
        opened={payableModalOpened}
        onClose={() => setPayableModalOpened(false)}
      >
        <div style={{ margin: "20px" }}>
          <div style={{ margin: "20px 0" }}>
            <h3>Payable Renters</h3>
            <span className="subtitle">
              * select the renter which one you want to make bill invoice
            </span>
          </div>

          {data ? (
            <form>
              <select
                style={{ width: "100%", marginBottom: "10px" }}
                name="renter"
                className=""
                onChange={handleChange}
                value={selectedData.renter}
              >
                <option value="">Select Renter</option>
                {data
                  ? data.map((item, index) =>
                      item.apartNo !== "" && item.roomNo !== "" ? (
                        <option key={index} value={JSON.stringify(item)}>
                          Floor: {item.level} &#10148; {item.renterName}
                          &#10148; Apartment: {item.apartNo}{" "}
                        </option>
                      ) : null
                    )
                  : null}
              </select>

              <button
                className="button infoButton"
                disabled={loading}
                onClick={onSubmit}
              >
                {loading ? <LoadingSpinner /> : "submit"}
              </button>
            </form>
          ) : (
            <>
              <LoadingSpinner />
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default PayableRenters;
