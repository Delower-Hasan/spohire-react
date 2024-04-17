import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import OptionDropdown from "../../pages/pricing/OptionDropdown";

const AddToSubscription = () => {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState("MONTHLY");
  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  return (
    <div
      className={`${
        location.pathname === "/dashboard/players" ? "d-none" : null
      }`}>
      <div className="range_header d-flex flex-wrap align-items-center w-100 justify-content-center gap-4">
        <h6>Subscription to view</h6>
        <OptionDropdown
          title="Players"
          subtitle={["Players", "COACHES", "PLAYERS + COACHES"]}
        />
        <h6>IN</h6>
        <OptionDropdown
          title="HANDBALL"
          subtitle={["HANDBALL", "Football", "basketball", "volleyball"]}
        />
        <h6>Transfer Market LIST</h6>
      </div>
      {/* <button /> */}
      <div className="pricing_buttons">
        <button
          className={activeButton === "MONTHLY" ? "active" : "inactive"}
          onClick={() => handleButtonClick("MONTHLY")}>
          MONTHLY
        </button>
        <button
          className={activeButton === "QUARTERLY" ? "active" : "inactive"}
          onClick={() => handleButtonClick("QUARTERLY")}>
          QUARTERLY
        </button>
        <button
          className={activeButton === "YEARLY" ? "active" : "inactive"}
          onClick={() => handleButtonClick("YEARLY")}>
          YEARLY
        </button>
      </div>
    </div>
  );
};

export default AddToSubscription;
