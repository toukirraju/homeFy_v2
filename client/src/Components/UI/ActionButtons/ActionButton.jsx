const ActionButton = ({ onClick, icon }) => (
  <button
    onClick={onClick}
    style={{
      position: "fixed",
      bottom: "100px",
      right: "30px",
      zIndex: "1",
      border: "none",
      outline: "none",
      backgroundColor: "grey",
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

export default ActionButton;
