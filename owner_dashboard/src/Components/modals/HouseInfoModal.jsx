import Styles from "./ModalStyle.module.css";
import { Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { OwnerInfo, updateHouseInfo } from "../../redux/slices/ownerSlice";
import LoadingSpinner from "../LoadingSpinner";

// import { uploadImage } from "../../actions/UploadAction";
// import { updateUser } from "../../actions/UserAction";

function HouseInfoModal({ modalOpened, setModalOpened, homeData }) {
  const { isPending } = useSelector((state) => state.houseInfo);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [formData, setFormData] = useState({});
  // const { password, ...other } = data;
  useEffect(() => {
    setFormData(homeData);
  }, [homeData]);

  // const [profileImage, setProfileImage] = useState(null);
  // const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  // const param = useParams();
  // console.log("formData", formData);
  // const { user } = useSelector((state) => state.authReducer.authData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const onImageChange = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     let img = event.target.files[0];
  //     event.target.name === "profileImage"
  //       ? setProfileImage(img)
  //       : setCoverImage(img);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    dispatch(updateHouseInfo(formData));
    setModalOpened(false);
    //   let UserData = formData;
    //   if (profileImage) {
    //     const data = new FormData();
    //     const fileName = Date.now() + profileImage.name;
    //     data.append("name", fileName);
    //     data.append("file", profileImage);
    //     UserData.profilePicture = fileName;
    //     try {
    //       dispatch(uploadImage(data));
    //     } catch (error) {
    //       console.log(data);
    //     }
    //   }
    //   if (coverImage) {
    //     const data = new FormData();
    //     const fileName = Date.now() + coverImage.name;
    //     data.append("name", fileName);
    //     data.append("file", coverImage);
    //     UserData.coverPicture = fileName;
    //     try {
    //       dispatch(uploadImage(data));
    //     } catch (error) {
    //       console.log(data);
    //     }
    //     dispatch(updateUser(param.id, UserData));
    //     setModalOpened(false);
    //   }
  };
  const resetInput = (e) => {
    e.target.value = "";
  };
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="sm"
      fullScreen={isMobile}
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm">
        <h3>House info</h3>
        <div>
          <input
            type="text"
            className={Styles.infoInput}
            name="houseName"
            onChange={handleChange}
            value={formData.houseName}
            onFocus={(e) => resetInput(e)}
            placeholder="House Name"
          />
          <input
            type="text"
            className={Styles.infoInput}
            name="houseNo"
            onChange={handleChange}
            value={formData.houseNo}
            onFocus={(e) => resetInput(e)}
            placeholder="House no"
          />
        </div>

        <div>
          {/* <input
            type="text"
            className={Styles.infoInput}
            name="livesin"
            onChange={handleChange}
            value={formData.livesin}
            onFocus={(e) => resetInput(e)}
            placeholder="Lives in"
          /> */}
          <input
            type="text"
            className={Styles.infoInput}
            name="village"
            onChange={handleChange}
            value={formData.village}
            onFocus={(e) => resetInput(e)}
            placeholder="Village"
          />
        </div>
        <div>
          <input
            type="text"
            className={Styles.infoInput}
            name="district"
            onChange={handleChange}
            value={formData.district}
            onFocus={(e) => resetInput(e)}
            placeholder="District"
          />
          <input
            type="text"
            className={Styles.infoInput}
            name="division"
            onChange={handleChange}
            value={formData.division}
            onFocus={(e) => resetInput(e)}
            placeholder="Division "
          />
        </div>
        {/* <div>
          Profile Image
          <input
            type="file"
            name="profileImage"
            // onChange={onImageChange}
          />
          Cover Image
          <input
            type="file"
            name="coverImage"
            // onChange={onImageChange}
          />
        </div> */}

        <button
          className={`button ${Styles.infoButton}`}
          onClick={handleSubmit}
          disabled={isPending}
        >
          {isPending ? <LoadingSpinner /> : "Update"}
        </button>
      </form>
    </Modal>
  );
}

export default HouseInfoModal;
