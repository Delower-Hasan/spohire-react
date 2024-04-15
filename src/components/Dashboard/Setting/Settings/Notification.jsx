import React, { useState } from "react";
import checkbox from "../../../../assets/checkbox.svg";
import checked from "../../../../assets/checked.svg";

const Notification = () => {
  const [selected, setSelected] = useState([]);

  const toggleSelection = (index) => {
    const newSelected = [...selected];
    if (newSelected.includes(index)) {
      newSelected.splice(newSelected.indexOf(index), 1);
    } else {
      newSelected.push(index);
    }
    setSelected(newSelected);
  };
  return (
    <div className="settings">
      <h4>Notifications settings</h4>
      <div className="d-flex flex-column gap-4">
        {[1, 2, 3].map((index) => (
          <div
            onClick={() => toggleSelection(index)}
            className="d-flex align-items-start gap-2"
            key={index}
            style={{ cursor: "pointer" }}
          >
            <img src={selected.includes(index) ? checked : checkbox} alt="" />
            <div>
              <p className="comment">Comment</p>
              <p className="post">
                Get Notified when someone posts a comment .
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
