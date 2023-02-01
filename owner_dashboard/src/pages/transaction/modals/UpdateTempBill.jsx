import Styles from "../../../Styles/ModalStyle.module.css";
import { Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  temporaryBill,
  updateTemporaryBill,
} from "../../../redux/slices/billSlice";
import { setReload } from "../../../redux/slices/reloadSlice";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import ConfirmationModal from "../../../Components/modals/ConfirmationModal";

const UpdateTempBill = ({
  updateTempBillModalOpened,
  setUpdateTempBillModalOpened,
  data,
}) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ ...data });

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
    setLoading(true);
    dispatch(updateTemporaryBill(formData))
      .unwrap()
      .then(() => {
        setLoading(false);
        dispatch(temporaryBill());
        toast.info("Temporary Bill updated!");
        setUpdateTempBillModalOpened(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
    // setTempData({
    //   ...formData,
    //   tempDue: parseInt(data.tempDue) + parseInt(formData.tempDue),
    // });
    // setUpdateTempBillModalOpened(false);
  };
  //   console.log(formData);
  useEffect(() => {
    setFormData({ ...data });
  }, [data]);
  // console.log(data);
  return (
    <>
      {/* <ConfirmationModal
        confirmationPopUp={confirmationPopUp}
        setConfirmationPopUp={setConfirmationPopUp}
        data={formData}
        popUp_type="Create_Temporary_Bill"
      /> */}
      <Modal
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        size={isMobile ? "sm" : "md"}
        opened={updateTempBillModalOpened}
        onClose={() => setUpdateTempBillModalOpened(false)}
        title="Update Temporary Bill"
      >
        <div className={`${Styles.bill__header} card`}>
          <h3>{data.renterName}</h3>
        </div>
        <>
          <div className={`${Styles.bill__info}`} style={{ margin: "15px 0" }}>
            <p className="card">
              Electricity Bill: <b>{data ? data.electricity_bill : 0}</b>
            </p>
            <p className="card">
              Others Bill: <b>{data ? data.others : 0}</b>
            </p>

            <p className="card">
              Old Due: <b>{data ? data.tempDue : 0}</b>
            </p>
          </div>
        </>

        <form onSubmit={submitHandler}>
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

          <button className={Styles.submit_button} disabled={loading}>
            {loading ? <LoadingSpinner /> : "submit"}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default UpdateTempBill;
