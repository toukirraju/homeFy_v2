import RightStyle from "./Right__side.module.css";

import {
  UilEstate,
  UilBell,
  UilMessage,
  UilSignOutAlt,
  UilSignin,
  UilCreateDashboard,
} from "@iconscout/react-unicons";
import MessageModal from "./MessageModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../../redux/slices/auth";

const RightNavBar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isMessageOn, setIsMessageOn] = useState(false);
  return (
    <>
      <div className={`card ${RightStyle.right__nav}`}>
        <div className={RightStyle.navIcons}>
          {user?.user.role === "owner" && (
            <>
              <Link to="/">
                <UilCreateDashboard />
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
