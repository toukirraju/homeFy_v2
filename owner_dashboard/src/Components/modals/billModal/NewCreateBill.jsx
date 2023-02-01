import Styles from "../ModalStyle.module.css";
import { Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import LoadingSpinner from "../../LoadingSpinner";
import ConfirmationModal from "../ConfirmationModal";
import useBillMaker from "../../../pages/transaction/hooks/useBillMaker";

const NewCreateBill = ({
  billModalOpened,
  setBillModalOpened,
  data,
  temporaryBill,
}) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const {
    total,
    newDue,
    formValue,
    onSubmit,
    submitedData,
    handleChange,
    confirmationPopUp,
    setConfirmationPopUp,
  } = useBillMaker(setBillModalOpened, temporaryBill, data);

  console.log(submitedData);
  // const [confirmationPopUp, setConfirmationPopUp] = useState(false);

  // const [apartmentData, setApartmentData] = useState({});
  // const [billData, setBillData] = useState({});
  // const [isSwitchOn, setIsSwitchOn] = useState(false);
  // const [loading, setLoading] = useState(false);

  // // const {  data?.apartment.apartmentDetails,  data?.apartment.billDetails } = data?.apartment;

  // const [formValue, setFormValue] = useState({
  //   renterId: "",
  //   renterName: "",
  //   electricity_bill: 0,
  //   others: 0,
  //   totalRent: 0,
  //   payableAmount: 0,
  //   paidAmount: "",
  //   due: 0,
  // });
  // const total =
  //   parseInt(data.apartment.billDetails.totalRent) +
  //   parseInt(formValue.electricity_bill) +
  //   parseInt(formValue.others) +
  //   parseInt(formValue.due);

  // const newDue = parseInt(total) - parseInt(formValue.paidAmount);

  // const handleChange = (e) => {
  //   setFormValue({ ...formValue, [e.target.name]: e.target.value });
  // };

  // const [submitedData, setSubmitedData] = useState({
  //   renterId: formValue.renterId,
  //   renterName: formValue.renterName,

  //   phone: data.phone,
  //   // isSMS: isSMSOn,

  //   electricity_bill: formValue.electricity_bill,
  //   others: formValue.others,
  //   totalRent: formValue.totalRent,
  //   payableAmount: total,
  //   paidAmount: formValue.paidAmount,
  //   due: newDue > 0 ? newDue : 0,
  // });
  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   // console.log(formValue);
  //   setSubmitedData({
  //     renterId: formValue.renterId,
  //     renterName: formValue.renterName,

  //     phone: data.phoneNo,
  //     // isSMS: isSMSOn,

  //     electricity_bill: formValue.electricity_bill,
  //     others: formValue.others,
  //     totalRent: formValue.totalRent,
  //     payableAmount: total,
  //     paidAmount: formValue.paidAmount,
  //     due: newDue > 0 ? newDue : 0,
  //   });
  //   setConfirmationPopUp(true);
  //   setBillModalOpened(false);
  // };
  // useEffect(() => {
  //   setFormValue({
  //     renterId: data.renterId,
  //     renterName: data.renterName,
  //     electricity_bill: temporaryBill.electricity_bill ? temporaryBill.electricity_bill : 0,
  //     others: temporaryBill.others ? temporaryBill.others : 0,
  //     totalRent: data.apartment.billDetails.totalRent,
  //     payableAmount: total,
  //     paidAmount: "",
  //     due: temporaryBill.tempDue ? temporaryBill.tempDue : 0,
  //   });
  // }, [temporaryBill, data]);
  return (
    <>
      <ConfirmationModal
        confirmationPopUp={confirmationPopUp}
        setConfirmationPopUp={setConfirmationPopUp}
        data={submitedData}
        popUp_type="Create_Bill"
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
        opened={billModalOpened}
        onClose={() => setBillModalOpened(false)}
        title="Make bill"
      >
        {Object.keys(data).length !== 0 ? (
          <div>
            <div
              className={`card ${Styles.bill__header}`}
              style={{ margin: "15px 0" }}
            >
              <h3>{data?.apartment.renterName}</h3>
              <span className="subtitle">
                Floor: {data?.apartment.apartmentDetails.floor}
              </span>
            </div>

            <div className={Styles.bill__info}>
              <p className="card">
                {" "}
                Rent: <b>{data?.apartment.billDetails.rent}</b>
              </p>
              <p className="card">
                Gas Bill: <b>{data?.apartment.billDetails.gas_bill}</b>
              </p>
              <p className="card">
                Water Bill: <b>{data?.apartment.billDetails.water_bill}</b>
              </p>
              <p className="card">
                Service Charge:{" "}
                <b>{data?.apartment.billDetails.service_charge}</b>
              </p>
              <p className="card">
                Others Bill: <b>{data?.apartment.billDetails.others}</b>
              </p>
              <p className="card">
                Electricity Bill: <b>{temporaryBill.electricity_bill}</b>
              </p>
              <p className="card">
                Others Temoprary Bill: <b>{temporaryBill.others}</b>
              </p>
              <p className="card">
                Total fixed Rent: <b>{data?.apartment.billDetails.totalRent}</b>
              </p>
              <p className="card">
                Old Due: <b>{temporaryBill ? temporaryBill.tempDue : 0}</b>
              </p>
            </div>

            <div
              className={`card ${Styles.bill__header}`}
              style={{ margin: "15px 0" }}
            >
              <p className="mt-2">
                {/* <b> */}
                Payable Amount: <b className="payableAmount">{total}</b> /-
                {/* </b> */}
              </p>
              <p className="mt-2">
                {/* <b> */}
                {newDue < 0
                  ? `Return Money : ${Math.abs(newDue)}`
                  : `Due : ${newDue}`}
                {/* </b> */}
              </p>
            </div>

            <form>
              <div className={Styles.switch}>
                <label>Manual add bill</label>
                <span
                  style={{
                    fontSize: "20px",
                    cursor: "pointer",
                    color: "#5bc8ab",
                  }}
                  onClick={() => {
                    setIsSwitchOn((prev) => !prev);
                  }}
                >
                  {isSwitchOn ? (
                    <i className="uil uil-toggle-on "></i>
                  ) : (
                    <i className="uil uil-toggle-off off__btn"></i>
                  )}
                </span>
              </div>

              {isSwitchOn && (
                <>
                  <div
                    className={`${Styles.input__container} ${Styles.infoInput}`}
                  >
                    <label className={Styles.input__label}>
                      Electricity bill
                    </label>
                    <input
                      type="number"
                      name="electricity_bill"
                      onChange={handleChange}
                      value={formValue.electricity_bill}
                      placeholder="Electricity bill"
                    />
                  </div>
                  <div
                    className={`${Styles.input__container} ${Styles.infoInput}`}
                  >
                    <label className={Styles.input__label}>Other bill</label>
                    <input
                      type="number"
                      name="others"
                      onChange={handleChange}
                      value={formValue.others}
                      placeholder="Other bill"
                    />
                  </div>
                </>
              )}
              <div className={`${Styles.input__container} ${Styles.infoInput}`}>
                <label className={Styles.input__label}>Paid amount</label>
                <input
                  style={{ fontSize: "16px", fontWeight: 700 }}
                  type="number"
                  className=" button "
                  name="paidAmount"
                  onChange={handleChange}
                  value={formValue.paidAmount}
                  placeholder="Paid amount"
                  onFocus={(e) => (e.target.value = "")}
                  required
                />
              </div>
              <button className="button infoButton" onClick={onSubmit}>
                submit
              </button>
            </form>
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </Modal>
    </>
  );
};

export default NewCreateBill;
