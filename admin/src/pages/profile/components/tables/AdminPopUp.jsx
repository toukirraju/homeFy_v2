import { Modal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
const AdminPopUp = ({ popUpModalOpened, setPopUpModalOpened, data }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <>
      <Modal
        classNames={{
          modal: `bg-gray-300 dark:bg-gray-800`,
          title: `modal__title`,
          close: `modal__close`,
        }}
        overlayOpacity={0.55}
        overlayBlur={3}
        size={isMobile ? "sm" : "md"}
        opened={popUpModalOpened}
        onClose={() => setPopUpModalOpened(false)}
      >
        admin popup
      </Modal>
    </>
  );
};

export default AdminPopUp;
