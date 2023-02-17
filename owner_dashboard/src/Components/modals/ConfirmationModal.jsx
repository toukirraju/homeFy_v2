import Styles from "./ModalStyle.module.css";
import { Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  GetManagers,
  OwnerInfo,
  RemoveRole,
  updateHouseInfo,
} from "../../redux/slices/ownerSlice";
import { removeLevels } from "../../redux/slices/apartmentSlice";
import { setReload } from "../../redux/slices/reloadSlice";
import { removeRenter } from "../../redux/slices/renterSlice";
import UnAssignRenter from "./renterModal/UnAssignRenter";
import {
  createBill,
  createTemporaryBill,
  monthlyBill,
  removeBill,
  removeTemporaryBill,
  temporaryBill,
} from "../../redux/slices/billSlice";
import LoadingSpinner from "../LoadingSpinner";
import { toast } from "react-toastify";
import { clearMessage } from "../../redux/slices/message";
// import { uploadImage } from "../../actions/UploadAction";
// import { updateUser } from "../../actions/UserAction";

function ConfirmationModal({
  confirmationPopUp,
  setConfirmationPopUp,
  data,
  popUp_type,
  isAssignData,
}) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [date, setDate] = useState(new Date());
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const [unAssignModalOpened, setUnAssignModalOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // console.log(isAssignData);
  // console.log(data);
  const handleSubmit = () => {
    switch (popUp_type) {
      case "Remove_Apartment":
        setLoading(true);
        dispatch(removeLevels(data))
          .unwrap()
          .then(() => {
            setLoading(false);
            toast.success("Successfully remove apartment");
            dispatch(setReload());
            setConfirmationPopUp(false);
          })
          .catch(() => {
            setLoading(false);
          });

        break;
      case "Remove_Renter":
        setLoading(true);
        dispatch(removeRenter(data))
          .unwrap()
          .then(() => {
            setLoading(false);
            dispatch(setReload());
            setConfirmationPopUp(false);
          })
          .catch(() => {
            setLoading(false);
          });
        break;

      case "Create_Bill":
        setLoading(true);
        dispatch(createBill(data))
          .unwrap()
          .then(() => {
            toast.success("Payment complete!");
            setLoading(false);
            setConfirmationPopUp(false);
            dispatch(monthlyBill({ month, year }));
            dispatch(temporaryBill());
            dispatch(clearMessage());
            // dispatch(setReload());
          })
          .catch(() => {
            setLoading(false);
          });
        // props.onHide(false);
        break;
      case "Remove_Bill":
        setLoading(true);
        dispatch(removeBill(data))
          .unwrap()
          .then(() => {
            toast.info("Bill removed!");
            setLoading(false);
            setConfirmationPopUp(false);
            dispatch(monthlyBill({ month, year }));
            dispatch(temporaryBill());
            dispatch(setReload());
          })
          .catch(() => {
            setLoading(false);
          });
        break;
      case "Create_Temporary_Bill":
        setLoading(true);
        dispatch(createTemporaryBill(data))
          .unwrap()
          .then(() => {
            toast.success("Temporary bill created!");
            setLoading(false);
            setConfirmationPopUp(false);
            dispatch(setReload());
          })
          .catch(() => {
            setLoading(false);
          });
        break;
      case "Remove_Temporary_Bill":
        setLoading(true);
        dispatch(removeTemporaryBill(data))
          .unwrap()
          .then(() => {
            toast.info("Temporary Bill removed!");
            setLoading(false);
            setConfirmationPopUp(false);
            dispatch(setReload());
          })
          .catch(() => {
            setLoading(false);
          });
        break;

      case "Delete_manager":
        setLoading(true);
        dispatch(RemoveRole(data))
          .unwrap()
          .then(() => {
            toast.success("Manager Deleted");
            setLoading(false);
            setConfirmationPopUp(false);
            dispatch(GetManagers());
          })
          .catch(() => {
            setLoading(false);
          });
        break;
    }
  };
  // console.log(data);
  const unAssingned = () => {
    setConfirmationPopUp(false);
    setUnAssignModalOpened(true);
  };
  return (
    <>
      <UnAssignRenter
        unAssignModalOpened={unAssignModalOpened}
        setUnAssignModalOpened={setUnAssignModalOpened}
        renterData={isAssignData}
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
        //   fullScreen={isMobile}
        opened={confirmationPopUp}
        onClose={() => setConfirmationPopUp(false)}
      >
        {data ? (
          <>
            {popUp_type === "Remove_Apartment" ||
            popUp_type === "Remove_Renter" ||
            popUp_type === "Remove_Bill" ||
            popUp_type === "Remove_Temporary_Bill" ||
            popUp_type === "Delete_manager" ? (
              <>
                <h3 className="title"> Are you sure? </h3>

                <div className={Styles.popUp__body}>
                  Do you really want to <b>{popUp_type}</b> ? After doing this
                  it can't be undone.
                </div>
                <div className={Styles.popUp__submit_btns}>
                  <button
                    className={`removeButton ${Styles.infoButton}`}
                    onClick={() => setConfirmationPopUp(false)}
                  >
                    cancel
                  </button>
                  <button
                    className={`button ${Styles.infoButton}`}
                    disabled={loading}
                    onClick={() => handleSubmit()}
                  >
                    {loading ? <LoadingSpinner /> : "submit"}
                  </button>
                </div>
              </>
            ) : popUp_type === "Create_Bill" ||
              popUp_type === "Create_Temporary_Bill" ? (
              <>
                <h3 className="title"> Are you sure? </h3>
                <div className={Styles.popUp__body}>
                  Do you really want to <b>{popUp_type}</b>? After creating, it
                  cannot be undone.
                </div>

                <div className={Styles.popUp__submit_btns}>
                  <button
                    className={`removeButton ${Styles.infoButton}`}
                    onClick={() => setConfirmationPopUp(false)}
                  >
                    cancel
                  </button>
                  <button
                    className={`button ${Styles.infoButton}`}
                    disabled={loading}
                    onClick={() => handleSubmit()}
                  >
                    {loading ? <LoadingSpinner /> : "submit"}
                  </button>
                </div>
              </>
            ) : null}
          </>
        ) : (
          <>
            <h3 className="title"> Are you sure? </h3>
            <div className={Styles.popUp__body}>
              To remove the <b>{popUp_type}</b>, it must be <b>unassigned</b>{" "}
              first.
            </div>
            <div className={Styles.popUp__submit_btns}>
              <button
                className={`removeButton ${Styles.infoButton}`}
                onClick={() => setConfirmationPopUp(false)}
              >
                cancel
              </button>
              <button
                className={`warningButton ${Styles.infoButton}`}
                onClick={() => unAssingned()}
              >
                unassign
              </button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}

export default ConfirmationModal;
