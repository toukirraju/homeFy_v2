const Alert = ({ message, type }) => {
  let bg;
  switch (type) {
    case "error":
      bg = "bg-red-600";
      break;
    case "success":
      bg = "bg-green-600";
      break;
    case "info":
      bg = "bg-sky-600";
      break;
    case "warning":
      bg = "bg-yellow-600";
      break;

    default:
      bg = "bg-blue-600";
      break;
  }
  return (
    <div
      className={`w-full flex justify-center  items-center text-white px-7 py-2 mb-2 rounded-md ${bg} bg-opacity-50 shadow-md border`}
    >
      {message}
    </div>
  );
};

export default Alert;
