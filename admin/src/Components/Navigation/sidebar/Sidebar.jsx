import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import profile from "../../../assets/user.png";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../../redux/features/auth/authSlice";
import { FaHouseUser } from "react-icons/fa";
import { BsHouses } from "react-icons/bs";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(true);
  const handleToggle = () => {
    setToggle(!toggle);
  };
  const navigate = useNavigate();
  return (
    <div className="sidebar ">
      <div className="nav container">
        <p className="nav__logo">
          <NavLink className="LinkUnset__hover" to="/home">
            HomeFy
          </NavLink>
        </p>

        <div className="nav__menu" style={toggle ? { bottom: "0" } : null}>
          <ul className="nav__list">
            <li className="nav__item" onClick={handleToggle}>
              <NavLink
                to="/dashboard"
                state={{ page: "Dashboard" }}
                className="nav__link"
              >
                <i className="uil uil-create-dashboard"></i> Dashboard
              </NavLink>
            </li>
            <li className="nav__item" onClick={handleToggle}>
              <NavLink
                to="apartment"
                state={{ page: "Apartment" }}
                className="nav__link"
              >
                <i className="uil uil-building"></i> Apartments
              </NavLink>
            </li>
            <li className="nav__item" onClick={handleToggle}>
              <NavLink
                to="renter"
                state={{ page: "Renters" }}
                className="nav__link"
              >
                <i className="uil uil-users-alt"></i> Renters
              </NavLink>
            </li>
            <li className="nav__item" onClick={handleToggle}>
              <NavLink
                to="owner"
                state={{ page: "Owners" }}
                className="nav__link flex items-center gap-2"
              >
                <FaHouseUser className="text-lg" /> <span>Owners</span>
              </NavLink>
            </li>
            <li className="nav__item" onClick={handleToggle}>
              <NavLink
                to="house"
                state={{ page: "Houses" }}
                className="nav__link flex items-center gap-2"
              >
                <BsHouses className="text-lg" /> <span>Houses</span>
              </NavLink>
            </li>
            <li className="nav__item" onClick={handleToggle}>
              <NavLink
                to="transaction"
                state={{ page: "Transactions" }}
                className="nav__link"
              >
                <i className="uil uil-invoice"></i> Transactions
              </NavLink>
            </li>
            <li className="nav__item" onClick={handleToggle}>
              <NavLink
                to="message"
                state={{ page: "Message" }}
                className="nav__link"
              >
                <i className="uil uil-message"></i> Message
              </NavLink>
            </li>
          </ul>
          <i
            onClick={handleToggle}
            className="uil uil-times nav__close"
            style={toggle ? null : { bottom: "-100%" }}
          ></i>
        </div>
        <div className="nav__btns">
          <i className="uil uil-palette theme-customization"></i>
          <div className="nav__toggle" onClick={handleToggle}>
            <i className="uil uil-apps"></i>
          </div>
        </div>
        <div className="nav__profile">
          <div className="circle">
            <div
              onClick={() =>
                navigate("profile", { state: { page: "Profile" } })
              }
            >
              <img className="profile__image" src={profile} alt="" />
            </div>
          </div>

          <button
            className="removeButton logout__btn"
            onClick={() => dispatch(userLoggedOut())}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
