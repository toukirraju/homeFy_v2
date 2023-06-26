import React from "react";
import LogoSearch from "../logoSearch/LogoSearch";
import DarkModeToggle from "../DarkModeToggle";

const Navbar = () => {
  return (
    <div className="card headerContainer ">
      <h3 className="title ">Dashboard</h3>
      {/* <div className="bulkCreate">
        <LogoSearch />
      </div> */}
      <DarkModeToggle />
    </div>
  );
};

export default Navbar;
