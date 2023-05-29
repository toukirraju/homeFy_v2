import { Link } from "react-router-dom";
import { UilRotate360 } from "@iconscout/react-unicons";
function ReturnButton() {
  return (
    <div className="flex justify-center items-center ">
      <Link to="/">
        <span className="text-gray-200 rounded-md  duration-300 bg-teal-700 hover:bg-teal-800 dark:bg-transparent dark:hover:bg-slate-600 dark:hover:bg-opacity-20 shadow-sm shadow-gray-400 px-2 py-1 flex gap-2">
          <UilRotate360 /> Return HomiFy
        </span>
      </Link>
    </div>
  );
}

export default ReturnButton;
