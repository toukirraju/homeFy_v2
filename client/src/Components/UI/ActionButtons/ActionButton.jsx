import { useMediaQuery } from "@mantine/hooks";

const ActionButton = ({ onClick, icon }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <button
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: "100px",
        right: !isMobile ? "30px" : null,
        left: isMobile ? "30px" : null,
        zIndex: "1",
        color: "white",
        cursor: "pointer",
        padding: "10px",
        borderRadius: "50%",
        opacity: "0.5",
      }}
    >
      {icon}
    </button>
  );
};

export default ActionButton;
