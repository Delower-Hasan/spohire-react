import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import useClickOutside from "../../hooks/useClickOutside";

const OptionDropdown = ({ title, subtitle }) => {
  const [selected, setSelected] = useState(title);
  const [open, setOpen] = useState(false);
  const closeDropDownRef = useClickOutside(() => setOpen(false));

  return (
    <div className="pricing_dropdown">
      <div
        style={{ color: "#05CD99" }}
        className="d-flex items-center justify-content-between  gap-3 p-3 "
        onClick={() => setOpen(!open)}>
        <p>{selected}</p>
        <button className="bg-transparent">
          <IoIosArrowDown
            style={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              color: "#05CD99",
            }}
          />
        </button>
      </div>
      {open && (
        <div
          ref={closeDropDownRef}
          className=" d-flex flex-column gap-3 dropDown_lists  border-top">
          {subtitle.map((data, index) => (
            <p onClick={() => setSelected(data)} key={index}>
              {data}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default OptionDropdown;
