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
} from "@iconscout/react-unicons";
import MessageModal from "../../pages/home/components/Right__Side/MessageModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import CustomPopover from "../UI/CustomPopover/CustomPopover";
import useAuth from "../../hooks/useAuth";
import { userLoggedOut } from "../../redux/features/auth/authSlice";

const RightNavBar = () => {
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.auth);
  const isLoggedIn = useAuth();
  const [isMessageOn, setIsMessageOn] = useState(false);
  const [opened, setOpened] = useState(false);
  const { pathname } = useLocation();

  const handleClosePopover = () => {
    setOpened(false);
  };

  const handleLogout = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
  };
  return (
    <>
      <div className={`card ${RightStyle.right__nav}`}>
        <div className={RightStyle.navIcons}>
          {pathname === "/profile" && (
            <>
              <Link to="/">
                <UilEstate />
              </Link>
            </>
          )}
          <a onClick={() => setIsMessageOn((prev) => !prev)}>
            <UilMessage />
          </a>
          <a>
            <UilBell />
          </a>
          <a onClick={() => setOpened((o) => !o)}>
            <UilEllipsisV cursor="pointer" />
          </a>
        </div>
      </div>
      {opened && (
        <CustomPopover onClose={handleClosePopover}>
          {isLoggedIn ? (
            <a className={RightStyle.right__logOut} onClick={handleLogout}>
              <div className={RightStyle.popover__buttons}>
                <span>
                  <UilSignOutAlt color="red" />
                </span>
                <span>SignOut</span>
              </div>
            </a>
          ) : (
            <Link to="/signin" className="LinkUnset__hover">
              <div className={RightStyle.popover__buttons}>
                <span>
                  <UilSignin />
                </span>
                <span>SignIn</span>
              </div>
            </Link>
          )}

          <div className={RightStyle.popover__buttons}>
            <span>
              <UilSetting />
            </span>
            <span>Setting</span>
          </div>

          <div className={RightStyle.popover__buttons}>
            <span>
              <UilInfoCircle />
            </span>
            <span> AboutUs</span>
          </div>
        </CustomPopover>
      )}
      {isMessageOn && <MessageModal />}
    </>
  );
};

export default RightNavBar;
