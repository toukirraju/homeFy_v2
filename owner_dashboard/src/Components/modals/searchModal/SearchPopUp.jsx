import Styles from "../ModalStyle.module.css";
import { Modal, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AssignRenter from "../renterModal/AssignRenter";

function SearchPopUp({ searchPopUp, setSearchPopUp, data, popUp_type }) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [assignModalOpened, setAssignModalOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    switch (popUp_type) {
      case "find__renter":
        // setLoading(true);
        // dispatch(removeLevels(data))
        //   .unwrap()
        //   .then(() => {
        //     setLoading(false);
        //     dispatch(setReload());
        //     setSearchPopUp(false);
        //   })
        //   .catch(() => {
        //     setLoading(false);
        //   });

        break;
    }
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
      size={isMobile ? "sm" : "md"}
      //   fullScreen={isMobile}
      opened={searchPopUp}
      onClose={() => setSearchPopUp(false)}
    >
      {data ? (
        <>
          {popUp_type === "find__renter" ? (
            <>
              <h3 className="title"> Search Result </h3>

              <div className={Styles.popUp__body} role="alert">
                <p className="">
                  <b>Username :</b>
                  {data.username}
                </p>
                <p>
                  <b>Name :</b>
                  {data.firstname + " " + data.lastname}
                </p>
                <p>
                  <b>Phone :</b>
                  {data.phoneNo}
                </p>
              </div>

              <button
                className="button create__btn"
                onClick={() => setAssignModalOpened(true)}
              >
                Assign
              </button>
              <AssignRenter
                assignModalOpened={assignModalOpened}
                setAssignModalOpened={setAssignModalOpened}
                renterData={data}
                searchPopUp={true}
              />
              {/* <div className="popUp__submit_btns">
                <button
                  className="removeButton popUp"
                  onClick={() => setSearchPopUp(false)}
                >
                  cancel
                </button>
                <button className="button popUp" onClick={() => handleSubmit()}>
                  submit
                </button>
              </div> */}
            </>
          ) : null}
        </>
      ) : (
        <></>
      )}
    </Modal>
  );
}

export default SearchPopUp;
