import React from "react";
import AddJobOfferPricing from "../../PricingPages/AddJobOfferPricing";
import SubsCriptionPricing from "../../PricingPages/SubsCriptionPricing";

const PricingModal = ({ setShowPricing, setSelectedPackages }) => {
  return (
    <div className="">
      <div className="">
        <SubsCriptionPricing />
        <AddJobOfferPricing setSelectedPackages={setSelectedPackages} />
      </div>
    </div>
  );
};

export default PricingModal;
