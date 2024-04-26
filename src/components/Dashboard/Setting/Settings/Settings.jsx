import React from "react";
import SettingsHeader from "./SettingsHeader";
import "./Settings.css";
import General from "./General";
import Notification from "./Notification";
import Subscription from "./Subscription";
import SelectInfo from "./SelectInfo";

const Settings = () => {
  return (
    <div>
      <SettingsHeader />
      <div className="row">
        <div className="col-lg-9">
          <General />
          {/* <Notification /> */}
        </div>
        <div className="col-lg-3">
          <Subscription />
          {/* <SelectInfo /> */}
        </div>
      </div>
    </div>
  );
};

export default Settings;
