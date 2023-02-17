import Styles from "../../../Styles/ModalStyle.module.css";
import { Loader, Switch, Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import ConfirmationModal from "../../../Components/modals/ConfirmationModal";
import useBillMaker from "../hooks/useBillMaker";

const CreateBill = ({
  billModalOpened,
  setBillModalOpened,
  data,
  temporaryBill,
}) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isSMSOn, setIsSMSOn] = useState(true);

  const {
    error,
    total,
    newDue,
    formValue,
    onSubmit,
    submitedData,
    handleChange,
    confirmationPopUp,
    setConfirmationPopUp,
  } = useBillMaker(setBillModalOpened, temporaryBill, data, isSMSOn);

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
                <div>
                  <span>Manual add bill</span>
                  <Switch
                    onLabel="ON"
                    offLabel="OFF"
                    checked={isSwitchOn}
                    onChange={(event) =>
                      setIsSwitchOn(event.currentTarget.checked)
                    }
                  />
                </div>
                <div className={Styles.switch}>
                  <span>SMS</span>
                  <Switch
                    onLabel="ON"
                    offLabel="OFF"
                    checked={isSMSOn}
                    onChange={(event) =>
                      setIsSMSOn(event.currentTarget.checked)
                    }
                  />
                </div>
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
                {error && <div className={Styles.input__error}>{error}</div>}
              </div>
              <button
                className={Styles.submit_button}
                disabled={error}
                onClick={onSubmit}
              >
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

export default CreateBill;
