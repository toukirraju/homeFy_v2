import React, { useState, useEffect, useRef } from "react";
import "./CustomPopover.css";
const CustomPopover = ({ children, onClose }) => {
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="card popover-container py-2" ref={ref}>
      {children}
    </div>
  );
};

export default CustomPopover;
