import React from "react";
import DarkModeToggle from "../DarkModeToggle";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const { state } = useLocation();
  return (
    <div className="card headerContainer ">
      <h3 className="title ">{state?.page}</h3>
      <DarkModeToggle />
    </div>
  );
};

export default Navbar;
