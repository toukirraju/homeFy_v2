import { useState } from "react";
import "./DropdownActionButton.css";

const DropdownActionButton = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    props.onOptionSelect(option);
    setIsOpen(false);
  };
  return (
    <div className="floating-dropdown-button">
      <button className="floating-button" onClick={handleButtonClick}>
        {isOpen ? "X" : props.label}
      </button>
      {isOpen && (
        <div className="options">
          {props.options.map((option, index) => (
            <div
              key={index}
              className="option"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownActionButton;
