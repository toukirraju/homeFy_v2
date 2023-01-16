import Styles from "../ModalStyle.module.css";
import { Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../LoadingSpinner";
import ConfirmationModal from "../ConfirmationModal";

const CreateBill = ({
  billModalOpened,
  setBillModalOpened,
  data,
  temporaryBill,
}) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [confirmationPopUp, setConfirmationPopUp] = useState(false);

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    renterId: "",
    renterName: "",
    e_bill: 0,
    o_bill: 0,
    totalRent: 0,
    payableAmount: 0,
    paidAmount: "",
    due: 0,
  });
  const total =
    parseInt(data.totalRent) +
    parseInt(formData.e_bill) +
    parseInt(formData.o_bill) +
    parseInt(formData.due);

  const newDue = parseInt(total) - parseInt(formData.paidAmount);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [submitedData, setSubmitedData] = useState({
    renterId: formData.renterId,
    renterName: formData.renterName,

    phone: data.phoneNo,
    // isSMS: isSMSOn,

    e_bill: formData.e_bill,
    o_bill: formData.o_bill,
    totalRent: formData.totalRent,
    payableAmount: total,
    paidAmount: formData.paidAmount,
    due: newDue > 0 ? newDue : 0,
  });
  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    setSubmitedData({
      renterId: formData.renterId,
      renterName: formData.renterName,

      phone: data.phoneNo,
      // isSMS: isSMSOn,

      e_bill: formData.e_bill,
      o_bill: formData.o_bill,
      totalRent: formData.totalRent,
      payableAmount: total,
      paidAmount: formData.paidAmount,
      due: newDue > 0 ? newDue : 0,
    });
    setConfirmationPopUp(true);
    setBillModalOpened(false);
  };
  useEffect(() => {
    setFormData({
      renterId: data.renterId,
      renterName: data.renterName,
      e_bill: temporaryBill.e_bill ? temporaryBill.e_bill : 0,
      o_bill: temporaryBill.o_bill ? temporaryBill.o_bill : 0,
      totalRent: data.totalRent,
      payableAmount: total,
      paidAmount: "",
      due: temporaryBill.tempDue ? temporaryBill.tempDue : 0,
    });
  }, [temporaryBill, data]);
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
        <div>
          <div
            className={`card ${Styles.bill__header}`}
            style={{ margin: "15px 0" }}
          >
            <h3>{data.renterName}</h3>
            <span className="subtitle">Floor: {data.level}</span>
          </div>

          <div className={Styles.bill__info}>
            <p className="card">
              {" "}
              Rent: <b>{data.rent}</b>
            </p>
            <p className="card">
              Gas Bill: <b>{data.gasbill}</b>
            </p>
            <p className="card">
              Water Bill: <b>{data.waterbill}</b>
            </p>
            <p className="card">
              Cleaning Service: <b>{data.c_service}</b>
            </p>
            <p className="card">
              Fridage Bill: <b>{data.f_bill}</b>
            </p>
            <p className="card">
              Electricity Bill: <b>{temporaryBill.e_bill}</b>
            </p>
            <p className="card">
              Others Bill: <b>{temporaryBill.o_bill}</b>
            </p>
            <p className="card">
              Total Rent: <b>{data.totalRent}</b>
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
                    name="e_bill"
                    onChange={handleChange}
                    value={formData.e_bill}
                    placeholder="Electricity bill"
                  />
                </div>
                <div
                  className={`${Styles.input__container} ${Styles.infoInput}`}
                >
                  <label className={Styles.input__label}>Other bill</label>
                  <input
                    type="number"
                    name="o_bill"
                    onChange={handleChange}
                    value={formData.o_bill}
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
                value={formData.paidAmount}
                placeholder="Paid amount"
                onFocus={(e) => (e.target.value = "")}
                required
              />
            </div>
            <button
              className="button infoButton"
              disabled={loading}
              onClick={onSubmit}
            >
              {loading ? <LoadingSpinner /> : "submit"}
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default CreateBill;
