import { Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createMultiApartment,
  update,
} from "../../../redux/slices/apartmentSlice";
import { setReload } from "../../../redux/slices/reloadSlice";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const UpdateApartment = ({ updateModalOpened, setUpdateModalOpened, data }) => {
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
    dispatch(update(formData))
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
  // console.log("apart" + data);
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
          <h3 className="title">Update Apartment Details</h3>

          <div className="input__container infoInput">
            <label className="input__label">Apartment Number</label>
            <input
              type="text"
              className=""
              name="apartNo"
              onChange={handleChange}
              value={formData.apartNo}
              //   onFocus={(e) => resetInput(e)}
              placeholder="Apartment number"
              required
            />
          </div>

          <div className="input__container infoInput">
            <label className="input__label">Room number</label>
            <input
              type="text"
              //   className="infoInput"
              name="roomNo"
              onChange={handleChange}
              value={formData.roomNo}
              //   onFocus={(e) => resetInput(e)}
              placeholder="Room number"
              required
            />
          </div>
          <div className="input__container infoInput">
            <label className="input__label">Rent</label>
            <input
              type="number"
              //   className="infoInput"
              name="rent"
              onChange={handleChange}
              value={formData.rent}
              //   onFocus={(e) => resetInput(e)}
              placeholder="Rent"
              required
            />
          </div>
          <div className="input__container infoInput">
            <label className="input__label">Gas bill</label>
            <input
              type="number"
              //   className="infoInput"
              name="gasbill"
              onChange={handleChange}
              value={formData.gasbill}
              //   onFocus={(e) => resetInput(e)}
              placeholder="Gas bill"
              required
            />
          </div>
          <div className="input__container infoInput">
            <label className="input__label">Water bill</label>
            <input
              type="number"
              //   className="infoInput"
              name="waterbill"
              onChange={handleChange}
              value={formData.waterbill}
              //   onFocus={(e) => resetInput(e)}
              placeholder="Water bill"
              required
            />
          </div>
          <div className="input__container infoInput">
            <label className="input__label">Fridge bill</label>
            <input
              type="number"
              //   className="infoInput"
              name="f_bill"
              onChange={handleChange}
              value={formData.f_bill}
              //   onFocus={(e) => resetInput(e)}
              placeholder="Fridge bill"
              required
            />
          </div>
          <div className="input__container infoInput">
            <label className="input__label">Service charge</label>
            <input
              type="number"
              //   className="infoInput"
              name="c_service"
              onChange={handleChange}
              value={formData.c_service}
              //   onFocus={(e) => resetInput(e)}
              placeholder="Service charge"
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

export default UpdateApartment;
