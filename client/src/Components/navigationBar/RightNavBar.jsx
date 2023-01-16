import RightStyle from "../../Styles/Right__side.module.css";

import {
  UilEstate,
  UilBell,
  UilMessage,
  UilSignOutAlt,
  UilSignin,
} from "@iconscout/react-unicons";
import MessageModal from "../../pages/home/components/Right__Side/MessageModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../redux/slices/auth";

const RightNavBar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isMessageOn, setIsMessageOn] = useState(false);
  const { pathname } = useLocation();
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

          {user ? (
            <a
              className={RightStyle.right__logOut}
              onClick={() => dispatch(logout())}
            >
              <UilSignOutAlt />
            </a>
          ) : (
            <Link to="/auth">
              <UilSignin />
            </Link>
          )}
        </div>
      </div>

      {isMessageOn && <MessageModal />}
    </>
  );
};

export default RightNavBar;
