import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import profile from "../../../assets/user.png";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/auth";

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
              <NavLink to="/" className="nav__link">
                <i className="uil uil-create-dashboard"></i> Dashboard
              </NavLink>
            </li>
            <li className="nav__item" onClick={handleToggle}>
              <NavLink to="apartment" className="nav__link">
                <i className="uil uil-building"></i> Apartments
              </NavLink>
            </li>
            <li className="nav__item" onClick={handleToggle}>
              <NavLink to="renter" className="nav__link">
                <i className="uil uil-users-alt"></i> Renters
              </NavLink>
            </li>
            <li className="nav__item" onClick={handleToggle}>
              <NavLink to="transaction" className="nav__link">
                <i className="uil uil-invoice"></i> Transactions
              </NavLink>
            </li>
            {/* <li className="nav__item" onClick={handleToggle}>
              <NavLink to="message" className="nav__link">
                <i class="uil uil-comment-image"></i>My posts
              </NavLink>
            </li> */}
            <li className="nav__item" onClick={handleToggle}>
              <NavLink to="message" className="nav__link">
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
          <span className="circle"></span>

          <div onClick={() => navigate("profile")}>
            <img className="profile__image" src={profile} alt="" />
          </div>

          <button
            className="removeButton logout__btn"
            onClick={() => dispatch(logout())}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
