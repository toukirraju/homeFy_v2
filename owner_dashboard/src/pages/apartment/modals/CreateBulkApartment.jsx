import { Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMultiApartment } from "../../../redux/slices/apartmentSlice";
import { setReload } from "../../../redux/slices/reloadSlice";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const CreateBulkApartment = ({ modalOpened, setModalOpened }) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({
    ownerId: user._id,
    ownerName: user.firstname + " " + user.lastname,
    numOfFloors: 0,
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(createMultiApartment(formData))
      .unwrap()
      .then(() => {
        setModalOpened(false);
        setLoading(false);
        dispatch(setReload());
        // toast.success("Successfully registered!");

        // dispatch(clearMessage());
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const resetInput = (e) => {
    e.target.value = "";
  };

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
        size={isMobile ? "sm" : "lg"}
        // fullScreen={isMobile}
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      >
        <form className="infoForm">
          <h3>Bulk Create</h3>
          <span className="subtitle">
            * if apartment already created then you can only create which floor
            you want to create
          </span>
          <div>
            <input
              type="number"
              className="infoInput"
              name="numOfFloors"
              onChange={handleChange}
              value={formData.numOfFloors}
              onFocus={(e) => resetInput(e)}
              placeholder="Number of floors"
              required
            />
          </div>

          <button
            className="button infoButton"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? <LoadingSpinner /> : "Create"}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default CreateBulkApartment;
