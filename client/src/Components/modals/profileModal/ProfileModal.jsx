import Styles from "../ModalStyle.module.css";
import { Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
// import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { uploadImage } from "../../actions/UploadAction";
// import { updateUser } from "../../actions/UserAction";

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  // const [profileImage, setProfileImage] = useState(null);
  // const [coverImage, setCoverImage] = useState(null);
  // const dispatch = useDispatch();
  // const param = useParams();

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

    console.log(formData);
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
        <h3>Your info</h3>
        <div>
          <input
            type="text"
            className={Styles.infoInput}
            name="firstname"
            onChange={handleChange}
            value={formData.firstname}
            placeholder="First Name"
          />
          <input
            type="text"
            className={Styles.infoInput}
            name="lastname"
            onChange={handleChange}
            value={formData.lastname}
            placeholder="Last Name"
          />
        </div>

        <div>
          <input
            type="text"
            className={Styles.infoInput}
            name="livesin"
            onChange={handleChange}
            value={formData.livesin}
            placeholder="Lives in"
          />
          <input
            type="text"
            className={Styles.infoInput}
            name="phoneNo"
            onChange={handleChange}
            value={formData.phoneNo}
            placeholder="Phone No"
          />
        </div>
        <div>
          <input
            type="text"
            className={Styles.infoInput}
            name="worksAt"
            onChange={handleChange}
            value={formData.worksAt}
            placeholder="Works at"
          />
        </div>
        <div>
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
        </div>

        <button
          className={`button ${Styles.infoButton}`}
          onClick={handleSubmit}
        >
          Update
        </button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
