import { Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Styles from "../../../Styles/ModalStyle.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unAssign } from "../../../redux/slices/assignRenterSlice";
import { setReload } from "../../../redux/slices/reloadSlice";
import LoadingSpinner from "../../LoadingSpinner";
import { toast } from "react-toastify";

const UnAssignRenter = ({
  unAssignModalOpened,
  setUnAssignModalOpened,
  renterData,
}) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.user);
  const [selectedData, setSelectedData] = useState({
    renter: "",
  });
  const handleChange = (e) => {
    setSelectedData({ ...selectedData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let renter = Array.isArray(renterData)
      ? JSON.parse(selectedData.renter)
      : null;

    const unAssignedData = {
      ownerId: user._id,
      apartmentId: renter ? renter.apartmentId : renterData.apartmentId,
      renterId: renter ? renter._id : renterData._id,
    };
    // console.log(unAssignedData);

    setLoading(true);
    dispatch(unAssign(unAssignedData))
      .unwrap()
      .then(() => {
        setLoading(false);
        toast.info("Un-Assigned");
        dispatch(setReload());
        setUnAssignModalOpened(false);
        setSelectedData({
          renter: "",
        });
      })
      .catch(() => {
        // toast.error("Something want wrong");
        setLoading(false);
      });
  };
  // console.log(renterData);

  return (
    <>
      <Modal
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        size={isMobile ? "sm" : "md"}
        opened={unAssignModalOpened}
        onClose={() => setUnAssignModalOpened(false)}
      >
        {Array.isArray(renterData) === true ? (
          <form>
            <div className={Styles.Modal_header}>
              <h3 className={Styles.Modal_header_title}>Unassign Renter</h3>
              <span className={Styles.Modal_header_subtitle}>
                * select the renter which one you want to unassign from the
                apartment
              </span>
            </div>
            <div className={Styles.input__container}>
              <select
                name="renter"
                className=""
                onChange={handleChange}
                value={selectedData.renter}
              >
                <option value="">Select Renter</option>
                {renterData
                  ? renterData.map((item, index) =>
                      item.apartment_number !== "" && item.roomNumber !== "" ? (
                        <option key={index} value={JSON.stringify(item)}>
                          Name: {item.firstname + " " + item.lastname} &#10148;
                          Phone: {item.phone}
                        </option>
                      ) : null
                    )
                  : null}
              </select>
            </div>

            <button
              className={`removeButton ${Styles.submit_button}`}
              disabled={loading}
              onClick={onSubmit}
            >
              {loading ? <LoadingSpinner /> : "Unassign"}
            </button>
          </form>
        ) : (
          <>
            <div className={Styles.Modal_header}>
              <h3 className={Styles.Modal_header_title}>
                Are you sure to unassign?
              </h3>
              <span className={Styles.Modal_header_subtitle}>
                After unassign you need to re-assign again
              </span>
            </div>

            <button
              className={`removeButton ${Styles.submit_button}`}
              disabled={loading}
              onClick={onSubmit}
              style={{
                // margin: "10px 13%",
                float: "right",
              }}
            >
              {loading ? <LoadingSpinner /> : "Unassign"}
            </button>
          </>
        )}
      </Modal>
    </>
  );
};

export default UnAssignRenter;
