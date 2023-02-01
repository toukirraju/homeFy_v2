import { Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import ConfirmationModal from "../../../Components/modals/ConfirmationModal";
import Styles from "../../../Styles/ModalStyle.module.css";

const CreateTempBill = ({
  createTempBillModalOpened,
  setCreateTempBillModalOpened,
  renterData,
  temporaryData,
}) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [confirmationPopUp, setConfirmationPopUp] = useState(false);
  const [tempData, setTempData] = useState({});
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const [formData, setFormData] = useState({
    renterId: "",
    renterName: "",
    electricity_bill: 0,
    others: 0,
    tempDue: 0,
  });

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setConfirmationPopUp(true);
    // setTempData({
    //   ...formData,
    //   tempDue: parseInt(temporaryData.tempDue) + parseInt(formData.tempDue),
    // });
    setCreateTempBillModalOpened(false);
  };
  //   console.log(formData);
  useEffect(() => {
    setFormData({
      renterId: renterData._id,
      renterName: renterData.firstname + " " + renterData.lastname,
      electricity_bill: 0,
      others: 0,
      tempDue: 0,
    });
  }, [renterData, temporaryData]);
  return (
    <>
      <ConfirmationModal
        confirmationPopUp={confirmationPopUp}
        setConfirmationPopUp={setConfirmationPopUp}
        data={formData}
        popUp_type="Create_Temporary_Bill"
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
        opened={createTempBillModalOpened}
        onClose={() => setCreateTempBillModalOpened(false)}
        title="Create Temporary Bill"
      >
        <div
          className={`${Styles.bill__header} card`}
          style={{ margin: "15px 0" }}
        >
          <h3>
            {renterData.firstname} {renterData.lastname}
          </h3>
          <span className="subtitle">Apartment: {renterData.apartNo}</span>
        </div>
        <>
          <div className={`${Styles.bill__info}`}>
            <p className="card">
              Electricity Bill:{" "}
              <b>{temporaryData ? temporaryData.electricity_bill : 0}</b>
            </p>
            <p className="card">
              Others Bill: <b>{temporaryData ? temporaryData.others : 0}</b>
            </p>

            <p className="card">
              Old Due: <b>{temporaryData ? temporaryData.tempDue : 0}</b>
            </p>
          </div>
        </>
        <div className={Styles.switch}>
          <label>Manual add due bill</label>
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
        <form onSubmit={submitHandler}>
          {isSwitchOn && (
            <>
              <div className={`${Styles.input__container} ${Styles.infoInput}`}>
                <label className={Styles.input__label}>Due bill</label>
                <input
                  type="number"
                  placeholder="Enter Due"
                  name="tempDue"
                  value={formData.tempDue}
                  //   onFocus={(e) => (e.target.value = "")}
                  onChange={changeHandler}
                  required
                />
              </div>
            </>
          )}

          <div className={`${Styles.input__container} ${Styles.infoInput}`}>
            <label className={Styles.input__label}>Electricity Bill</label>
            <input
              type="number"
              placeholder="Enter Electricity Bill"
              name="electricity_bill"
              value={formData.electricity_bill}
              //   onFocus={(e) => (e.target.value = "")}
              onChange={changeHandler}
              required
            />
          </div>

          <div className={`${Styles.input__container} ${Styles.infoInput}`}>
            <label className={Styles.input__label}>Others Bill</label>
            <input
              type="number"
              placeholder="Enter Others Bill"
              name="others"
              value={formData.others}
              //   onFocus={(e) => (e.target.value = "")}
              onChange={changeHandler}
              required
            />
          </div>

          <button className={Styles.submit_button}>Submit</button>
        </form>
      </Modal>
    </>
  );
};

export default CreateTempBill;
