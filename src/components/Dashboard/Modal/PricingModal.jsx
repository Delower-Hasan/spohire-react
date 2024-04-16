import React from "react";
import AddJobOfferPricing from "../../PricingPages/AddJobOfferPricing";
import SubsCriptionPricing from "../../PricingPages/SubsCriptionPricing";

const PricingModal = () => {
  return (
    <div className="addplayer_modal">
      <div className="inner">
        <SubsCriptionPricing />
        <AddJobOfferPricing/>
      </div>
    </div>
  );
};

export default PricingModal;
