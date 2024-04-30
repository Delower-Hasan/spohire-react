import React, { useState } from "react";
import "../../pages/pricing/Pricing.css";
import OptionDropdown from "../../pages/pricing/OptionDropdown";
import { useDispatch } from "react-redux";
import { setSubscriptionTimeline } from "../../features/auth/authSlice";

const BuySubscriptionModalContent = ({ user, openModal }) => {
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState("MONTHLY");

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
    dispatch(setSubscriptionTimeline(buttonType));
  };

  const manager = user?.role == "Manager";

  return (
    <div>
      <div className="range_header d-flex flex-wrap align-items-center w-100 justify-content-center gap-4">
        <h6>Subscription to view</h6>
        {manager && (
          <OptionDropdown
            title="Players"
            subtitle={["Players", "COACHES", "PLAYERS + COACHES"]}
          />
        )}
        <h6>IN</h6>
        {manager && (
          <OptionDropdown
            title="HANDBALL"
            subtitle={["HANDBALL", "Football", "basketball", "volleyball"]}
          />
        )}
        <h6>Transfer Market LIST</h6>
      </div>

      <div className="pricing_buttons">
        <button
          className={activeButton === "MONTHLY" ? "active" : "inactive"}
          onClick={() => handleButtonClick("MONTHLY")}
        >
          MONTHLY
        </button>
        <button
          className={activeButton === "QUARTERLY" ? "active" : "inactive"}
          onClick={() => handleButtonClick("QUARTERLY")}
        >
          QUARTERLY
        </button>
        <button
          className={activeButton === "YEARLY" ? "active" : "inactive"}
          onClick={() => handleButtonClick("YEARLY")}
        >
          YEARLY
        </button>
      </div>
    </div>
  );
};

export default BuySubscriptionModalContent;
