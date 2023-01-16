import Styles from "../ModalStyle.module.css";
import { Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import PostShare from "../../postComponents/postShare/PostShare";

function CreatePost({ postModalOpened, setPostModalOpened, data }) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const handleSubmit = (e) => {
    e.preventDefault();
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
      <>{/* <PostShare /> */}</>
    </Modal>
  );
}

export default CreatePost;
