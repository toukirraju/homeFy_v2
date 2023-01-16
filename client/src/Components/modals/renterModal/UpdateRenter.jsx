import { Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReload } from "../../../redux/slices/reloadSlice";
import { updateRenterInfo } from "../../../redux/slices/renterSlice";
import LoadingSpinner from "../../LoadingSpinner";

const UpdateRenter = ({ updateModalOpened, setUpdateModalOpened, data }) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState(data);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(updateRenterInfo(formData))
      .unwrap()
      .then(() => {
        setUpdateModalOpened(false);
        setLoading(false);
        dispatch(setReload());
        // toast.success("Successfully registered!");

        // dispatch(clearMessage());
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setFormData(data);
  }, [data]);
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
        opened={updateModalOpened}
        onClose={() => setUpdateModalOpened(false)}
      >
        <form className="">
          <h3 className="title">Update Renter info</h3>

          <div className="input__container infoInput">
            <label className="input__label">First name</label>
            <input
              type="text"
              className=""
              name="firstname"
              onChange={handleChange}
              value={formData.firstname}
              //   onFocus={(e) => resetInput(e)}
              placeholder="First name"
              required
            />
          </div>

          <div className="input__container infoInput">
            <label className="input__label">Last name</label>
            <input
              type="text"
              //   className="infoInput"
              name="lastname"
              onChange={handleChange}
              value={formData.lastname}
              //   onFocus={(e) => resetInput(e)}
              placeholder="Last name"
              required
            />
          </div>
          <div className="input__container infoInput">
            <label className="input__label">Phone number</label>
            <input
              type="text"
              //   className="infoInput"
              name="phoneNo"
              onChange={handleChange}
              value={formData.phoneNo}
              //   onFocus={(e) => resetInput(e)}
              placeholder="Phone number"
              required
            />
          </div>
          <div className="input__container infoInput">
            <label className="input__label">Nid</label>
            <input
              type="text"
              //   className="infoInput"
              name="nid"
              onChange={handleChange}
              value={formData.nid}
              //   onFocus={(e) => resetInput(e)}
              placeholder="Nid"
              required
            />
          </div>
          <div className="input__container infoInput">
            <label className="input__label">Address</label>
            <input
              type="text"
              //   className="infoInput"
              name="livesin"
              onChange={handleChange}
              value={formData.livesin}
              //   onFocus={(e) => resetInput(e)}
              placeholder="Address"
              required
            />
          </div>

          <div className="input__container infoInput">
            <label className="input__label">Advance Rent</label>
            <input
              type="number"
              //   className="infoInput"
              name="advanceRent"
              onChange={handleChange}
              value={formData.advanceRent}
              //   onFocus={(e) => resetInput(e)}
              placeholder="Advance Rent"
              required
            />
          </div>

          <div className="input__container">
            <button
              className="button infoButton"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? <LoadingSpinner /> : "update"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default UpdateRenter;
