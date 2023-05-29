import { UilAngleRightB } from "@iconscout/react-unicons";
const Header = () => {
  return (
    <div className="absolute top-0">
      <div className="border rounded-md shadow-md px-3 text-gray-600 dark:text-slate-400 mt-5 text-justify flex justify-center flex-col md:flex-row items-center  gap-3">
        <span>
          Are you <b>Home owner</b> ?
        </span>
        <span>You can't to manage your home properly?</span>

        <button
          onClick={() => {
            window.open("https://dashboard.h0mify.com", "_blank");
          }}
          className="my-2 hover:bg-teal-700 duration-300  bg-teal-600 shadow-md shadow-gray-500 text-gray-300 drop-shadow-md font-bold py-1 px-2 flex justify-center items-center rounded-md"
        >
          Go for Dashboard <UilAngleRightB />
        </button>

        {/* <span>
          Effortlessly manage your property with our user-friendly dashboard!
          log in or register now.
        </span> */}
      </div>
    </div>
  );
};

export default Header;
