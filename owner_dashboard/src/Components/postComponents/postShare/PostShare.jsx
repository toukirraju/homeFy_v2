import React, { useState, useRef } from "react";
import "./PostShare.css";
import ProfileImg from "../../../assets/user.png";
import { useSelector, useDispatch } from "react-redux";
import { Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  UilScenery,
  UilPlayCircle,
  UilLocationPoint,
  UilSchedule,
  UilTimes,
} from "@iconscout/react-unicons";
import { createPost } from "../../../redux/slices/postSlice";
// import { uploadImage, uploadPost } from "../../actions/UploadAction";
import LoadingSpinner from "../../LoadingSpinner";

const PostShare = ({ postModalOpened, setPostModalOpened, data }) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [loading, setLoading] = useState(false);
  // const loading = useSelector((state) => state.postReducer.uploading);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const desc = useRef();
  const { user } = useSelector((state) => state.auth.user);

  // const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      ownerId: user._id,
      apartmentId: data._id,
      desc: desc.current.value,
      isVisible: true,
    };

    console.log(newPost);
    // if (image) {
    //   const data = new FormData();
    //   const filename = Date.now() + image.name;
    //   data.append("name", filename);
    //   data.append("file", image);
    //   newPost.image = filename;
    //   console.log(newPost);
    //   try {
    //     // dispatch(uploadImage(data));
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    setLoading(true);
    dispatch(createPost(newPost))
      .unwrap()
      .then(() => {
        setPostModalOpened(false);
        setLoading(false);
        // dispatch(setReload());
        // toast.success("Successfully registered!");
        // dispatch(clearMessage());
      })
      .catch(() => {
        setLoading(false);
      });
    reset();
  };

  const reset = () => {
    setImage(null);
    desc.current.value = "";
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
      size={isMobile ? "sm" : "lg"}
      opened={postModalOpened}
      onClose={() => setPostModalOpened(false)}
    >
      <div className="PostSHare">
        <img src={ProfileImg} alt="" />
        <div>
          <input
            ref={desc}
            required
            type="text"
            placeholder="Short description"
          />
          <div className="postOptions">
            <div
              className="option"
              style={{ color: "var(--photo)" }}
              onClick={() => imageRef.current.click()}
            >
              <UilScenery />
              Photo
            </div>
            {/* <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div> */}
            <div className="option" style={{ color: "var(--location)" }}>
              <UilLocationPoint />
              Location
            </div>
            <div className="option" style={{ color: "var(--shedule)" }}>
              <UilSchedule />
              Schedule
            </div>
            <button
              className="button ps-button"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <LoadingSpinner /> : "Share"}
            </button>
            <div style={{ display: "none" }}>
              <input
                type="file"
                name="myImage"
                // ref={imageRef}
                // onChange={onImageChange}
              />
            </div>
          </div>

          {/* {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )} */}
        </div>
      </div>
    </Modal>
  );
};

export default PostShare;
