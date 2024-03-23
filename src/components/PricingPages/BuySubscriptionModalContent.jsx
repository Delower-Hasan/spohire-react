import React, { useState } from 'react'
import '../../pages/pricing/Pricing.css';
import OptionDropdown from '../../pages/pricing/OptionDropdown';

const BuySubscriptionModalContent = ({ user }) => {

    const [activeButton, setActiveButton] = useState("MONTHLY");

    const handleButtonClick = (buttonType) => {
        setActiveButton(buttonType);
    };

    const manager = user?.role == "Manager"

    return (
        <div>
            <div className="range_header d-flex align-items-center w-100 justify-content-center gap-4">
                <h6>Subscription to view</h6>
                {manager && <OptionDropdown title="Players" subtitle={["Players", "COACHES", "PLAYERS + COACHES"]} />}
                <h6>IN</h6>
                {manager && <OptionDropdown
                    title="HANDBALL"
                    subtitle={["HANDBALL", "Football", "basketball", "volleyball"]}
                />}
                <h6>Transfer Market LIST</h6>
            </div>
            <div className='pricing_buttons'>
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
    )
}

export default BuySubscriptionModalContent