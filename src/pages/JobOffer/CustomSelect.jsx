/* eslint-disable react/prop-types */
import { useState } from "react";

const CustomSelect = ({ options, setJobTypeFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value) => {
    setSelectedOption(value === selectedOption ? null : value);
    setIsOpen(false);
  };

  return (
    <>
      <div className="custom-dropdown">
        <div className="select-container w-100  ">
          <div className="select-value" onClick={toggleDropdown}>
            {/* {selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Select'} */}
            {selectedOption ? selectedOption : "Select here"}

            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="9"
                viewBox="0 0 16 9"
                fill="none"
              >
                <path
                  d="M15.0278 0.929688L8.01389 7.94358L1 0.929688"
                  stroke="#0095FF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          {isOpen && (
            <div className="options-container pb-4">
              {options.map((option) => (
                <div
                  key={option.value}
                  className={`option ${
                    selectedOption === option.value ? "selected" : ""
                  }`}
                  onClick={() => handleOptionClick(option.value)}
                >
                  <div
                    name="jobType"
                    className={` ${
                      selectedOption === option.value ? "active_checkbox" : ""
                    }`}
                  >
                    <div className="non_checked">
                      <div className="checkbox_custom"></div>
                    </div>
                  </div>
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomSelect;
