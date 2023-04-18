import RightStyle from "../../Styles/Right__side.module.css";
import {
  UilEstate,
  UilBell,
  UilMessage,
  UilSignOutAlt,
  UilSignin,
  UilEllipsisV,
  UilSetting,
  UilInfoCircle,
  UilTimes,
} from "@iconscout/react-unicons";
import MessageModal from "../../pages/home/components/Right__Side/MessageModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import CustomPopover from "../UI/CustomPopover/CustomPopover";
import useAuth from "../../hooks/useAuth";
import { userLoggedOut } from "../../redux/features/auth/authSlice";
import DarkModeToggle from "../DarkModeToggle";

const RightNavBar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useAuth();
  const [isMessageOn, setIsMessageOn] = useState(false);
  const [opened, setOpened] = useState(false);
  const { pathname } = useLocation();

  const handleClosePopover = () => {
    setOpened(false);
  };

  const handleLogout = () => {
    dispatch(userLoggedOut());
    localStorage.removeItem("auth");
  };
  return (
    <>
      <div className={`card ${RightStyle.right__nav}`}>
        <div className={`${RightStyle.navIcons} dark:text-gray-300`}>
          {pathname === "/profile" && (
            <>
              <Link to="/">
                <UilEstate />
              </Link>
            </>
          )}
          <span onClick={() => setIsMessageOn((prev) => !prev)}>
            <UilMessage />
          </span>
          <span>
            <UilBell />
          </span>

          {opened ? (
            <UilTimes cursor="pointer" onClick={handleClosePopover} />
          ) : (
            <span onClick={() => setOpened(true)}>
              <UilEllipsisV cursor="pointer" />
            </span>
          )}
        </div>
      </div>
      {opened && (
        <CustomPopover onClose={handleClosePopover}>
          {isLoggedIn ? (
            <span className={RightStyle.right__logOut} onClick={handleLogout}>
              <div className="flex justify-center items-center px-3 gap-1 my-3 rounded-lg cursor-pointer py-1 dark:text-gray-300 hover:bg-slate-300 dark:hover:bg-slate-600 ">
                <span>
                  <UilSignOutAlt color="red" />
                </span>
                <span>SignOut</span>
              </div>
            </span>
          ) : (
            <Link to="/signin" className="LinkUnset__hover">
              <div className="flex justify-center items-center px-3 gap-1 my-3 rounded-lg cursor-pointer py-1 dark:text-gray-300 hover:bg-slate-300 dark:hover:bg-slate-600 ">
                <span>
                  <UilSignin />
                </span>
                <span>SignIn</span>
              </div>
            </Link>
          )}

          <div className="flex justify-center items-center px-3 gap-3 dark:text-gray-300">
            <DarkModeToggle />
            <span>
              <UilSetting />
            </span>

            <span>
              <UilInfoCircle />
            </span>
          </div>
        </CustomPopover>
      )}
      {isMessageOn && <MessageModal />}
    </>
  );
};

export default RightNavBar;
