import React from "react";
import DarkModeToggle from "../DarkModeToggle";

const Navbar = () => {
  return (
    <div className="card headerContainer ">
      <h3 className="title ">Dashboard</h3>
      <DarkModeToggle />
    </div>
  );
};

export default Navbar;
