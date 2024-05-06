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
    <>
      {location.pathname === "/dashboard/players" ? (
        <div className="add-player-head d-flex gap-4 justify-content-center pb-5">
          <h6>Add</h6>
          <h6>PLAYER</h6>
          <h6>to</h6>
          <h6>Transfer Market LIST</h6>
        </div>
      ) : location.pathname === "/dashboard/coaches" ||
        location.pathname === "/pricing" ? (
        <div>
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
      ) : null}
    </>
  );
};

export default AddToSubscription;
