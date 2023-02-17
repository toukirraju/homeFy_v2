import Styles from "../../../Styles/ModalStyle.module.css";
import { Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  UilChatBubbleUser,
  UilUser,
  UilMobileAndroid,
} from "@iconscout/react-unicons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AssignRenter from "../../../Components/modals/renterModal/AssignRenter";

function SearchPopUp({ searchPopUp, setSearchPopUp, data }) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [assignModalOpened, setAssignModalOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  return (
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
      opened={searchPopUp}
      onClose={() => setSearchPopUp(false)}
    >
      {data && (
        <>
          <h3 className={Styles.Modal_header_title}> Search Result </h3>
          <div className={Styles.widget__innerCard}>
            <div className={Styles.widget__card__content}>
              <span>{<UilChatBubbleUser />}</span>
              <span>Username</span>
              <span>{data.username}</span>
            </div>
          </div>

          <div className={Styles.widget__innerCard}>
            <div className={Styles.widget__card__content}>
              <span>{<UilUser />}</span>
              <span>Name</span>
              <span>{data.firstname + " " + data.lastname}</span>
            </div>
          </div>
          <div className={Styles.widget__innerCard}>
            <div className={Styles.widget__card__content}>
              <span>{<UilMobileAndroid />}</span>
              <span>Phone</span>
              <span>{data.phoneNo}</span>
            </div>
          </div>

          <button
            className={Styles.submit_button}
            onClick={() => setAssignModalOpened(true)}
          >
            Assign
          </button>
          <AssignRenter
            assignModalOpened={assignModalOpened}
            setAssignModalOpened={setAssignModalOpened}
            renterData={data}
            renterPopUp={true}
          />
        </>
      )}
    </Modal>
  );
}

export default SearchPopUp;
