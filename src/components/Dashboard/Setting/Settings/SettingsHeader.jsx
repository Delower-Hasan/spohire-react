import React from "react";

const SettingsHeader = () => {
  return (
    <div className="settings_header d-flex gap-4 justify-content-between align-items-center">
      <h4>General setting</h4>
      <div className="d-flex align-items-center gap-4 ">
        <button className="cancel_btn">Cancel</button>
        <button className="save_btn">Save Changes</button>
      </div>
    </div>
  );
};

export default SettingsHeader;
